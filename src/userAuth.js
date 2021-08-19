
const URL_AUTH = "http://localhost:4000/auth/";

const saveToLocalStorage = true; 

export const authenticatedUser = {
    userd: '',
    userName: '',
    userLogin: '',
    userRoles: [],
    userAccessToken: '' 
};

let userIsAuthentificatedListeners = [];

updateAuthenticatedUserDataFromLocalStorage();

export function addUserIsAuthentificatedListener (userIsAuthentificatedSetter){
    userIsAuthentificatedListeners.push(userIsAuthentificatedSetter);
}

function setUserIsAuthenticated(UserIsAuthenticated){
    userIsAuthentificatedListeners.forEach((listener)=>listener(UserIsAuthenticated))
}

export function login(userLogin, userPassword) {
    const body = {userLogin: userLogin, userPassword: userPassword};
    return postUser('login', body, saveToLocalStorage);
}

export function register(userLogin, userPassword){
    const body = {userLogin: userLogin, userPassword: userPassword};
    return postUser('signup', body, !saveToLocalStorage);
}

export function logOut(){
    const body = {userAccessToken: JSON.parse(localStorage.getItem('user')).userAccessToken};
    localStorage.removeItem('user');
    cleanupAuthenticatedUserData();
    setUserIsAuthenticated(false);
    return postUser('logout', body, !saveToLocalStorage);
}

export function updateAuthenticatedUserDataFromLocalStorage(){
    
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('updateAuthenticatedUserDataFromLocalStorage');
    console.log(user);
    (!user) && cleanupAuthenticatedUserData() && setUserIsAuthenticated(false);
    user && Object.assign(authenticatedUser, user);
 //   user && (authenticatedUser.userAccessToken = user.userAccessToken);
 //   user && accessTokenExpired(user) && localStorage.removeItem('user'));
}

function cleanupAuthenticatedUserData(){
    Object.assign(authenticatedUser, {
         userd: '',
         userName: '',
         userLogin: '',
         userRoles: [],
         userAccessToken: '' }); 

         //uthenticatedUser.userAccessToken = '';
}

function accessTokenExpired(){
  return false;
}

function saveUserToLocalStorage(user){
    if (user.userAccessToken) {
        localStorage.setItem("user", JSON.stringify(user));
    }
}

function postUser(authPath, authBody, saveToLocalStorage = false){
    return new Promise((resolve, reject)=>{
        fetch(URL_AUTH + authPath, { 
            method: 'POST', 
            body: JSON.stringify(authBody),  
            headers: { 
                'Content-Type': 'application/json',                
            }
        })
        .then(res => res.json())
        .then(user => {
            saveToLocalStorage && saveUserToLocalStorage(user);
            Object.assign(authenticatedUser, user);
            setUserIsAuthenticated(true);
            //authenticatedUser.userAccessToken = user.userAccessToken;
            resolve(user);
        })
        .catch(reject);
    });
}