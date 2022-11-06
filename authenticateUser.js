var admin = require("firebase-admin");

export default function authenticateUser(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("no auth header");
      return res.status(401).end("Not authenticated. No Auth header");
    }
    try {
      let token = await admin.auth().verifyIdToken(authHeader);
      if (!token || !token.uid) return res.status(401).end("Not authenticated");
      console.log("token", token);
      req.bucketName = token.user_id;
      req.uid = token.user_id;
      req.username = token.name;
      req.picture = token.picture;
      req.email = token.email;
    } catch (error) {
      console.log(error.errorInfo);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === "auth/internal-error") {
        error.status = 500;
      }
      return res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };
}
