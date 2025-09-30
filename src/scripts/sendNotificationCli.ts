import Mailer from '../services/mailer.js';

async function main() {
  const recipient = process.env.RECIPIENT_EMAIL;
  const testResult = process.env.TEST_RESULT || 'unknown';
  const buildResult = process.env.BUILD_RESULT || 'unknown';
  const workflowStatus = process.env.WORKFLOW_STATUS || 'unknown';

  if (!recipient) {
    console.error('RECIPIENT_EMAIL is not set');
    process.exit(1);
  }

  const mailer = new Mailer();
  await mailer.init();

  try {
    const transportInfo = (mailer as any).transporter?._options
      ? { type: 'smtp', host: (mailer as any).transporter._options.host }
      : (mailer as any).transporter?.__transportInfo || null;
    console.log('Transport info:', transportInfo);
  } catch (e) {
    console.log('Transport info: unknown');
  }

  const subject = `Pipeline result: ${workflowStatus}`;
  const text = `Tests: ${testResult}\nBuild: ${buildResult}\nStatus: ${workflowStatus}`;

  const { info, preview } = await mailer.send({ to: recipient, subject, text });
  console.log('Sent:', info.messageId || info);
  if (preview) console.log('Preview URL:', preview);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
