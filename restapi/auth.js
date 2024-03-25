const admin = require("firebase-admin");

async function checkauth (req, res, next)  {
  const idToken = req.headers.authorization; // Assuming the token is sent in the Authorization header
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach the decoded token to the request object
    console.log("yippie")
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

module.exports=checkauth;
