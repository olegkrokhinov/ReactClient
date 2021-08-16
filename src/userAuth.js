
const URL_AUTH = "http://localhost:4000/auth/";


const saveToLocalStorage = true; 

export let userAccessToken = '';
export let authenticatedUser = getUserFromLocalStorage();
(authenticatedUser) && (userAccessToken = authenticatedUser.userAccessToken); 

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
    return postUser('logout', body, !saveToLocalStorage);
}

export function getUserFromLocalStorage(){
    let user = JSON.parse(localStorage.getItem('user'));
    user && accessTokenExpired(user) && localStorage.removeItem('user') && (user = {});
    return user;
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
            authenticatedUser = user;
            (authenticatedUser) && (userAccessToken = authenticatedUser.userAccessToken);
            resolve(user);
        })
        .catch(reject);
    });
}