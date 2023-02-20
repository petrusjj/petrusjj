import * as functions from "firebase-functions";

import admin = require("firebase-admin");

import * as cors from "cors";

import * as dotenv from "dotenv";

dotenv.config();

admin.initializeApp();

const corsHandler = cors({origin: true});

const handler = (response: functions.Response<unknown>) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send(JSON.stringify({data: "Hello 123!"}));
};

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info(`process: ${process.env.NODE_ENV}`, {
    structuredData: true,
  });
  if (process.env.NODE_ENV === "development") {
    corsHandler(request, response, () => {
      return handler(response);
    });
  } else {
    return handler(response);
  }
});
