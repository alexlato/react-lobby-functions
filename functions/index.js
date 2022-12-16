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

    const fallbackPlayers = [
      {
        id: 1,
        color: null,
      },
      {
        id: 2,
        color: null,
      },
      {
        id: 3,
        color: null,
      },
      {
        id: 4,
        color: null,
      },
    ];

    if (!userData) {
      response.json(fallbackPlayers);
    } else {
      response.json(userData);
    }
  }
});

exports.setColors = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const userId = request.query.uid;
  if (userId) {
    console.log(`I am setting the player colors for user ${userId}`);
    console.log(JSON.stringify(request.rawBody));

    const writeResult = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ playerColors: request.body });

    response.json(writeResult);
  }
});
