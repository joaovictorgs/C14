import Mailer from '../services/mailer.js';

async function main() {
  const recipient = process.env.RECIPIENT_EMAIL;
  const testResult = process.env.TEST_RESULT ?? 'unknown';
  const buildResult = process.env.BUILD_RESULT ?? 'unknown';
  const workflowStatus = process.env.WORKFLOW_STATUS ?? 'unknown';
  const runUrl = process.env.RUN_URL ?? '';
  const gitSha = process.env.GIT_SHA?.slice(0, 8) ?? '';
  const gitRef = process.env.GIT_REF ?? '';

  if (!recipient) {
    console.error('RECIPIENT_EMAIL is not set');
    process.exit(1);
  }

  const mailer = new Mailer();
  await mailer.init();

  const transportInfo = mailer.getTransportInfo();
  console.log('Transport info:', transportInfo);

  const subject = `[CI] Tests: ${testResult} | Build: ${buildResult} | ${workflowStatus}`;
  const lines = [
    `Status do workflow: ${workflowStatus}`,
    `Tests: ${testResult}`,
    `Build: ${buildResult}`,
    gitRef ? `Ref: ${gitRef}` : '',
    gitSha ? `SHA: ${gitSha}` : '',
    runUrl ? `Run: ${runUrl}` : '',
  ].filter(Boolean);

  const text = lines.join('\n');
  const html = `<pre>${lines.join('\n')}</pre>`;

  const { info, preview } = await mailer.send({ to: recipient, subject, text, html });
  console.log('E-mail enviado:', (info as any).messageId || info);
  if (preview) console.log('Preview URL:', preview);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
