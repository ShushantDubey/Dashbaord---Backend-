const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const createEvent = async (req, res) => {
    try {
        const db = getFirestore();
        const eventsRef = db.collection("events").doc();
        await eventsRef.set({
            events: req.body.events,
            uid: req.uid
        });
        return res.status(200).send(eventsRef);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }    
}

module.exports.createEvent = createEvent;