# Pottmayer automation mqtt listener microservice

## Description
This project is a microservice built using Node.js, Express, TypeScript, and the Prisma ORM configured with a connection to a PostgreSQL database. Its purpose is to subscribe to topics on the Mosquitto broker. When it detects messages coming from IoT devices (such as sensors integrated with Arduino) on these topics, it persists this data in the database for later processing and consumption by other applications.

Environment variables

1. (OPTIONAL) APP_PORT
    Example : APP_PORT=4545
2. (REQUIRED) MQTT_HOST
    Example: MQTT_HOST=tls://c5a1125865344269b77e748a5b313caafae.s2.eu.hivemq.cloud:8883
3. (REQUIRED) MQTT_USERNAME
    Example: MQTT_USERNAME=hivemq.webclient.1654039210851
4. (REQUIRED) MQTT_PASSWORD
    Example: MQTT_PASSWORD=P7KZ9zk:g.AwejW>69f&

## Steps to run this project (locally/dev mode):

1. Run `npm i` command
2. Setup (create if needed) the environment variables in `.env` file
3. For development environment run `npm run dev`

## Steps to run this project (Docker container):

1. Run `docker build -t pottmayer-automation-topic-listener .` command inside your project folder

2. Run 
    `docker run -d --name pottmayer-automation-topic-listener-container -p 3333:3333 -e APP_PORT=3333 -e MQTT_HOST="your_mqtt_broker_addres_with_protocol_prefix_and_port_suffix" -e MQTT_AUTOSUBSCRIBE_TOPICS="first_topic_to_auto_subscribe||second_topic_to_auto_subscribe" -e MQTT_USERNAME="your_mqtt_broker_username" -e MQTT_PASSWORD="your_mqtt_broker_password" pottmayer-automation-topic-listener`
   command

By running this commands, the app will start by default on port 3333.