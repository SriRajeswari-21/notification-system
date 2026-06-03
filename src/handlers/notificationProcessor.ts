import { SQSEvent, SQSRecord } from "aws-lambda";

export const handler = async (
  event: SQSEvent
): Promise<void> => {

  console.log("SQS Event received:", JSON.stringify(event));
  //throw new Error("DLQ Test");
  for (const record of event.Records) {

    try {

      await processMessage(record);

    } catch (err) {

      console.error(
        "Message processing failed:",
        err
      );

      throw err;
    }
  }
};

async function processMessage(
  record: SQSRecord
): Promise<void> {

  const body = JSON.parse(record.body);

  console.log(
    "Processing notification:",
    JSON.stringify(body)
  );

  const { type, recipient, message } = body;

  if (type === "email") {

    console.log(
      `EMAIL sent to ${recipient}: ${message}`
    );

  } else if (type === "sms") {

    console.log(
      `SMS sent to ${recipient}: ${message}`
    );

  } else {

    throw new Error(
      `Unsupported notification type: ${type}`
    );
  }

  // Failure simulation for learning
  if (message.toLowerCase().includes("fail")) {

    throw new Error(
      "Simulated processing failure"
    );
  }

  console.log(
    "Notification processed successfully"
  );
}