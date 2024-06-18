const Queue = require("bull");
const sendEmail = require("../helpers/sendEmail");

const emailQueue = new Queue("email Queue", {
  redis: { port: process.env.REDIS_PORT , host: process.env.REDIS_HOST  },
}); // Specify Redis connection using object

emailQueue.process(async function (job, done) {
  await sendEmail(job.data);
});

module.exports = emailQueue;
