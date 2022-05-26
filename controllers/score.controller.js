const admin = require('firebase-admin');
const {
    getFirestore,
    Timestamp,
    FieldValue,
  } = require("firebase-admin/firestore");

const createScore = async (req, res) => {
    try {
        const db = getFirestore();
        const scoreRef = db.collection("scores").doc();
        await scoreRef.set({
            score: req.body.score,
            totalScore: req.body.totalScore,
            date: Date.now(),
            uid: req.uid
        });
        return res.status(201).send(scoreRef);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
}

module.exports.createScore = createScore;