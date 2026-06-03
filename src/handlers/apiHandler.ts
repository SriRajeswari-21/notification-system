import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Joi from "joi";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({});

const schema = Joi.object({
  type: Joi.string()
    .valid("email", "sms")
    .required(),

  recipient: Joi.string()
    .required(),

  message: Joi.string()
    .required()
});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  console.log("Incoming request:", event.body);

  try {

    const body = JSON.parse(event.body || "{}");

    const { error } = schema.validate(body);

    if (error) {

      console.error("Validation failed:", error.message);

      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message
        })
      };
    }

    const command = new SendMessageCommand({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify(body)
    });

    await sqs.send(command);

    console.log("Message sent to queue");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Notification queued successfully"
      })
    };

  } catch (err) {

    console.error("Processing error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error"
      })
    };
  }
};