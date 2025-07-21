import serverless from "serverless-http";
import app from "../dist/src/app"; 

export const handler = serverless(app)