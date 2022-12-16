const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const cors = require("cors");

exports.addMessage = functions.https.onRequest((req, res) => {
  const options = {
    origin: "*",
  };
  cors(options)(req, res, () => {
    return res.json({ status: "ok" });
  });
});

exports.getColors = functions.https.onRequest(async (request, response) => {
  const userId = request.query.uid;
  if (userId) {
    console.log(`I am fetching the player colors for user ${userId}`);
    const snapshot = admin.firestore().collection("users").doc(userId).get();
    const userData = (await snapshot).data().playerColors;
    console.log(userData);
    response.json(userData);
  }
});

exports.setColors = functions.https.onRequest(async (request, response) => {
  const userId = request.query.uid;
  if (userId) {
    console.log(`I am setting the player colors for user ${userId}`);
    const snapshot = admin.firestore().collection("users").doc(userId).get();

    const currentColors = (await snapshot).data().playerColors;

    console.log(currentColors);

    const writeResult = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ playerColors: currentColors });

    response.json(writeResult);
  }
});
