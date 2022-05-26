const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const createUser = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.uid);
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: "user",
    });
    //store user details in DB
    const db = getFirestore();
    const userRef = db.collection("users").doc(req.uid);
    await userRef.set({
      name: req.body.name,
      defaultRole: "user",
      email: req.body.email,
    });
    return res.status(201).send(userRef);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

module.exports.createUser = createUser;

const updateUser = async (req, res) => {
  try {
    const data = {};
    const uid = req.params.id;
    const userRef = getFirestore().collection("users").get(uid);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).send(`User with id ${uid} not found`);
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.email) {
      data.email = req.body.email;
    }
    await userRef.update(data);
    await admin
      .auth()
      .updateUser(uid, { 
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.name && { displayName: `${req.body.name}`}) 
    });
    return res.status(200).send(userRef);
  } catch (error) {
    console.log(e);
    return res.status(500).send(e.message);
  }
  //conditional
  //non token base on db update
  //token base both auth and db changes
};

module.exports.updateUser = updateUser;

const readUser = async (req, res) => {
  try {
    const uid = req.params.id;
    const userRef = getFirestore().collection("users").doc(uid);
    const user = await userRef.get();
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

module.exports.readUser = readUser;

const readUsers = async (req, res) => {
  //for admin purpose
  //firestore read
  try {
    const usersRef = getFirestore().collection("users");
    const users = await usersRef.get();
    return res.status(200).send(users);
  } catch (error) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

module.exports.readUsers = readUsers;

const deleteUser = async (req, res) => {
  try {
    const uid = req.params.id;
    const userRef = getFirestore().collection("users").doc(uid);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).send(`User with id ${uid} not found`);
    }
    await userRef.delete();
    await admin.auth().deleteUser(uid);
    return res.status(200).send(userRef);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

module.exports.deleteUser = deleteUser;
