const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const createModule = async (req, res) => {
    try {
        const db = getFirestore();
        const modulesRef = db.collection("modules").doc();
        await modulesRef.set({
            modules: req.body.modules,
            uid: req.uid
        });
        return res.status(200).send(modulesRef);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
}

module.exports.createModule = createModule;