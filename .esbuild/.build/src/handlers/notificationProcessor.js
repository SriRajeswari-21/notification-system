"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handlers/notificationProcessor.ts
var notificationProcessor_exports = {};
__export(notificationProcessor_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(notificationProcessor_exports);
var handler = async (event) => {
  console.log("SQS Event received:", JSON.stringify(event));
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
async function processMessage(record) {
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
  if (message.toLowerCase().includes("fail")) {
    throw new Error(
      "Simulated processing failure"
    );
  }
  console.log(
    "Notification processed successfully"
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=notificationProcessor.js.map
