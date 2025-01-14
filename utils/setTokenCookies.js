const setTokensCookies=(res,accessToken,refreshToken,newAccessTokenExp,newRefreshTokenExp)=>{
   const accessTokenMaxAge= (newAccessTokenExp - Math.floor(Date.now()/1000)) * 1000;
   const refreshTokenMaxAge= (newRefreshTokenExp-Math.floor(Date.now()/1000)) * 1000;

 // Set Cookie for Access Token
    res.cookie('accessToken', accessToken,{
        maxAge:accessTokenMaxAge,
        httpOnly:true,
        secure:true
    })

//  Set Cookie for Refresh Token
    res.cookie('refreshToken', refreshToken, {
       maxAge:refreshTokenMaxAge,
       httpOnly: true,
       secure:true
    })

// Set Cookie for is_auth
    res.cookie('isLoggedin', true,{
        maxAge:refreshTokenMaxAge,
        httpOnly:false,
        secure:false
    }) 
}

module.exports = setTokensCookies