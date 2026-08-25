import nodemailer from "nodemailer";

// Reads SMTP configuration from environment variables (see .env.example).
// Throws a clear error if required values are missing so misconfiguration is obvious.
export function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
  });
}

export const mailConfig = {
  from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
  fromName: process.env.SMTP_FROM_NAME || "Hampton Family Dental Website",
  to: process.env.ENQUIRY_TO || "info@hamptonfamilydentist.com",

  /**
   * Second copy of every submission, sent as its own message.
   *
   * These are patients in pain: a lead lost to a full mailbox, an expired app
   * password or an Office 365 outage is a person who never gets called back.
   * A separate send (rather than a Bcc) means the two deliveries fail
   * independently - one bouncing does not take the other with it.
   *
   * Defaults to the SAME client-owned mailbox as `to`, and that is deliberate:
   * patient contact details must not route to an agency inbox. Two independent
   * SMTP transactions to one address still buy real redundancy, because the
   * failures this guards against are per-message rather than per-mailbox - a
   * silent bounce, a transient 4xx, a spam-filter drop. There is deliberately
   * no "skip if identical to `to`" guard; both sends must go out.
   *
   * Swap this to a second client-owned address (angela@, frontdesk@) as soon
   * as the office provisions one - two mailboxes beat two attempts at one.
   *
   * Set BACKUP_ENQUIRY_TO="" to switch it off.
   */
  backupTo:
    process.env.BACKUP_ENQUIRY_TO ?? "info@hamptonfamilydentist.com",
};
