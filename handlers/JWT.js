const { sign, verify } = require("jsonwebtoken");


const createTokens = (user) => {

  // Generationg token

  const accessToken = sign(
    { id: user.id },
    "jwtsecret959679"
  );
  return accessToken;
};


const validateToken = (req,res,next)=>{
  const accessToken = req.cookies["access-token"]
  if(!accessToken){
    return res.status(400).json({message:"User not authenticated ! "})
  }
    try {
      const validToken = verify(accessToken,"jwtsecret959679")
      if(validToken){
        req.authenticated = true 
        return next()
      }
    } catch (error) {
      return res.status(400).json({message:error})
    }
  
}


module.exports = {createTokens, validateToken}