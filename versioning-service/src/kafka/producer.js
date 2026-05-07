const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "versioning-service",
  brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(",")
});

const producer = kafka.producer();

let connected = false;

async function connectProducer() {
  if (!connected) {
    await producer.connect();
    connected = true;
  }
}

async function publishVersionCreated(version) {
  await connectProducer();

  await producer.send({
    topic: "version.created",
    messages: [
      {
        key: String(version.file_id),
        value: JSON.stringify({
          event: "version.created",
          service: "versioning-service",
          timestamp: new Date().toISOString(),
          data: version
        })
      }
    ]
  });
}

module.exports = {
  publishVersionCreated
};