
const URL_AUTH = "http://localhost:4000/api/auth/";

const userAuth = {
    getCurrentUser,
    login,
    logout,
    register,  
}

const saveToLocalStorage = true; 

function login(userLogin, userPassword) {
    const body = {login: userLogin, password: userPassword};
    return postUser('login', body, saveToLocalStorage);
}

function register(userLogin, userPassword){
    const body = {login: userLogin, password: userPassword};
    return postUser('signup', body, !saveToLocalStorage);
}

function logout(){
    const body = {accessToken: JSON.parse(localStorage.getItem('user')).accessToken};
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
    if (user.accessToken) {
        localStorage.setItem("user", JSON.stringify(user));
    }
}

function postUser(authPath, authBody, saveToLocalStorage = false){
    
    return new Promise((resolve, reject)=>{
        
        fetch(URL_AUTH + authPath, { 
            method: 'post', 
            body: JSON.stringify(authBody),  
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => {
            saveToLocalStorage && saveUserToLocalStorage(json);
            resolve(json);
        })
        .catch(reject);
    });
}

export default userAuth