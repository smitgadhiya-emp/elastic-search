import { Kafka } from "kafkajs";
import { testKafkaSubscribe, userCreatedSubscribe, userCreateSendNotification } from "../kafka/user.subscribe";

const kafka = new Kafka({ clientId: "app", brokers: ["localhost:9092"] });
const producer = kafka.producer();

export async function kafkaProducerRun() {
    await producer.connect();
    console.log("Kafka Producer connected");
}

export const publishMessage = async (topic: string, message: string) => {
    await producer.send({
        topic,
        messages: [{ value: message }],
    });
};

export const subscribeToTopic = async (topic: string, groupId: string, callback: (message: string) => void) => {
    const consumer = kafka.consumer({ groupId });
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            console.log("topic -=-=", topic)
            console.log("partition -=-=", partition)
            callback(message.value?.toString() || "");
        },
    });
}


export const kafkaConsumerRun = async () => {

    // subscribeToTopic("user-created", "user-created-group", userCreatedSubscribe);
    // subscribeToTopic("user-create-send-notification", "user-created-group", userCreateSendNotification);


    subscribeToTopic("test-kafka", "test-kafka-group", testKafkaSubscribe);
}





// setInterval(() => {
//     publishMessage("test-topic", "Hello Kafka");
//     console.log("Message publisheddddddd");
// }, 2000);