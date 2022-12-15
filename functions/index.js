const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.getColors = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET");

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
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET");

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
