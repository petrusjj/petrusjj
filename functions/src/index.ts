import * as functions from "firebase-functions";

import admin = require("firebase-admin");

import * as cors from "cors";
const corsHandler = cors({origin: true});

admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    functions.logger.info("Hello logs!", {structuredData: true});

    response.send(JSON.stringify({data: "Hello 123!"}));
  });
});
