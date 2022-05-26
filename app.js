const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('./serviceAccount.json');
const routes = require("./routes")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.send('Hello World!')
});

app.use("/api", routes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`)
);
