
const URL_AUTH = "http://localhost:4000/auth/";


const saveToLocalStorage = true; 

function login(userLogin, userPassword) {
    const body = {userLogin: userLogin, userPassword: userPassword};
    return postUser('login', body, saveToLocalStorage);
}

function register(userLogin, userPassword){
    const body = {userLogin: userLogin, userPassword: userPassword};
    return postUser('signup', body, !saveToLocalStorage);
}

function logOut(){
    const body = {userAccessToken: JSON.parse(localStorage.getItem('user')).userAccessToken};
    localStorage.removeItem('user');
    return postUser('logout', body, !saveToLocalStorage);
}

function getCurrentUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    user && accessTokenExpired(user) && localStorage.removeItem('user') && (user = {})
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
        .then(json => {
            saveToLocalStorage && saveUserToLocalStorage(json);
            resolve(json);
        })
        .catch(reject);
    });
}


const userAuth = {
    getCurrentUser,
    login,
    logOut,
    register,  
}

export default userAuth