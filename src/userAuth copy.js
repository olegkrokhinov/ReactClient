
https://gist.github.com/soulmachine/b368ce7292ddd7f91c15accccc02b8df

function getJWTExpireDate(jwtToken: string) {
    if (jwtToken) {
      try {
        const [, payload] = jwtToken.split('.');
        const { exp: expires } = JSON.parse(window.atob(payload));
        if (typeof expires === 'number') {
          return new Date(expires * 1000);
        }
      } catch {
        // ignore
      }
    }
    return null;
  }


jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
        localStorage.clear();
    }}
});

// Pass in function expiration date to check token 
function checkToken(exp) {
    if (Date.now() <= exp * 1000) {
      console.log(true, 'token is not expired')
    } else { 
      console.log(false, 'token is expired') 
    }
  }
