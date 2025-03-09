export const storeAuthDataAsCookies = (authData) => {
    // document.cookie = "username="+authData['JwtToken']+"";
    document.cookie = "username="+authData['username']+",token="+authData['jwtToken']+",id="+authData['id'];
}

export const deleteAuthDataAsCookies = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}

export const isAuthenticated = () => {
    if (document.cookie === "") return false;
    else return true;
}
