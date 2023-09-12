import * as mqtt from "mqtt";
import { IMessageRepository } from "../data/interfaces/IMessageRepository";
import { MessageRepository } from "../data/MessageRepository";

export class MqttHandler {
  repository: IMessageRepository;
  mqttClient: mqtt.MqttClient;
  host: string;
  username: string;
  password: string;

  constructor() {
    this.mqttClient = null;
    this.host = process.env.MQTT_HOST;
    this.username = process.env.MQTT_USERNAME;
    this.password = process.env.MQTT_PASSWORD;
    this.repository = new MessageRepository();
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });

    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);

      this.autoSubscribeOnStart();
    });

    this.mqttClient.on("message", (topic, message) => {
      this.onMessage(topic, message);
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  autoSubscribeOnStart() {
    const autoSubscriveEnvVariable = process.env.MQTT_AUTOSUBSCRIBE_TOPICS;
    if (autoSubscriveEnvVariable) {
      const topics = autoSubscriveEnvVariable.split("||");

      topics.forEach((topic) => {
        this.subscribe(topic);
      });
    }
  }

  sendMessage(topic: string, message: string) {
    this.mqttClient.publish(topic, message);
  }

  subscribe(topic: string) {
    this.mqttClient.subscribe(topic, { qos: 0 });
    console.log(`subscribed to topic ${topic}`);
  }

  private async onMessage(topic, message) {
    await this.repository.createMessage({
      message: message.toString(),
      topic: topic.toString(),
    });
  }
}
