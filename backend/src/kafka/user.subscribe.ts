export const userCreatedSubscribe = async (message: string) => {

    console.log("User created event received:", message);
};

export const userCreateSendNotification = async (message: string) => {
    console.log("User created send notification :", message);
};


export const testKafkaSubscribe = async (message: string) => {
    console.log("Test Kafka event received:", message);
};
