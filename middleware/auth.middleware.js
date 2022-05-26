const admin = require("firebase-admin")

module.exports = (options) => {
  return async (req, res, next) => {
    try {
      const decodedToken = await admin
        .auth()
        .verifyIdToken(req.header("Authorization").replace("Bearer ", ""))
      req.uid = decodedToken.uid
      if (decodedToken.role) {
        req.role = decodedToken.role
      }
      if (!options) {
        return next()
      }

      var allow = options.hasRole.some((elem) => elem == decodedToken.role)
      if (!allow) {
        return res.status(401).send({ error: "Invalid role" })
      }
      next()
    } catch (e) {
      console.log(e);
      let { message, code } = e
      if (code) {
        code = code.split("/").pop().split("-").join(" ")
        code = code.charAt(0).toUpperCase() + code.slice(1)
      }
      console.log({ error: code ? code : message })
      res.status(401).send({ error: "Access denied" })
    }
  }
}