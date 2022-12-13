const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.getColors = functions.https.onRequest(async (request, response) => {
  const userId = request.query.uid;
  if (userId) {
    console.log(`I am fetching the player colors for user ${userId}`);
    const snapshot = admin
      .firestore()
      .collection(users)
      .doc(`users/${userId}`)
      .get();
    const userData = (await snapshot).data();
    console.log(userData);
  }
  response.send("All done! Check logs!");
});
