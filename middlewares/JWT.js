const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  // Generationg token

  const accessToken = sign({ id: user.id }, "jwtsecret959679");
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  // console.log("This is accessToken", accessToken);
  // console.log(
  //   "----------------------------------------------------------------"
  // );
  if (!accessToken) {
    return res.status(400).json({ message: "User not authenticated ! " });
  }
  try {
    const validToken = verify(accessToken, "jwtsecret959679");
    // console.log("This is valid token", validToken);
    // console.log(
    //   "----------------------------------------------------------------"
    // );

    if (validToken) {
      req.payload = validToken;
      
      // console.log(
      //   "----------------------------------------------------------------"
      // );
      // console.log("This is payload",req.payload)
      
      return next();
    }
    else{
      console.log("no token")
    }
  } catch (error) {
    return res.status(400).json({ message: "error" });
  }
};

module.exports = { createTokens, validateToken };
