import dayjs from "dayjs";
import { emailTemplates } from "./email-template";
import transporter, { accountEmail } from "../config/nodemailer";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Invalid arguments");

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) throw new Error("Invalid template");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D YYYY"),
    planName: subscription.name,
    price: `${subscription.price} ${subscription.currency} (${subscription.frequency})`,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to,
    subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error, "Error sending email");
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
