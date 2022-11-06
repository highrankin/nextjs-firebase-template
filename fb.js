const admin = require("firebase-admin");
const serviceAccount = require("./fbkey.json");
const { getFirestore } = require("firebase-admin/firestore");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}
const db = getFirestore();
try {
  db.settings({ ignoreUndefinedProperties: true });
} catch (error) {}

export default db;
