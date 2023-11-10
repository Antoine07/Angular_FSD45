'use strict';
import express, { Express } from 'express';

import cors from "cors";
import router from './routes/main';
import auth from './routes/auth';
import cookieParser from 'cookie-parser';

import { port, host } from "./config";

const app : Express = express();
const urlApp: string | undefined = process.env.URL_APP

// récupération des données post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: urlApp, credentials: true }));

// routers
app.use("/api", router);
app.use("/api", auth);

app.listen(port, () =>
  console.log(`listen ${host}:${port}`),
);