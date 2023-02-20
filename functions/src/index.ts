import * as cors from "cors";
import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

dotenv.config();
admin.initializeApp();

const corsHandler = cors({origin: true});

const handler = (res: functions.Response<unknown>) => {
  res.send(JSON.stringify({data: "Test?!"}));
};

export const helloWorld = functions.https.onRequest((req, res) => {
  if (process.env.NODE_ENV !== "development") return handler(res);
  return corsHandler(req, res, () => handler(res));
});
