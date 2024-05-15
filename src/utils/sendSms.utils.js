import twilio from "twilio";

async function sendSms(phone) {
  try {
    const transport = twilio(process.env.TWILO_SID, process.env.TWILO_TOKEN);
    transport.messages.create({
      body: "Mensaje de verificacion de la app de todoModa",
      from: process.env.TWILO_PHONE,
      to: phone,
    });
  } catch (error) {
    throw error;
  }
}

export default sendSms;
