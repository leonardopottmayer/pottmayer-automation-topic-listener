import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { MqttHandler } from "./mqtt/MqttHandler";

var mqttClient = new MqttHandler();
mqttClient.connect();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

export default app;
