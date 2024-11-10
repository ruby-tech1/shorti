import cron from "node-cron";
import { ping } from "./stayAlive.js";

const timeSchedule = `*/30 * * * * *`;

const startCron = () => {
  cron.schedule(timeSchedule, ping);
  console.log("Cron-Job Scheduled");
};

export default startCron;
