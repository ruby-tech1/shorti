import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import express from "express";
const app = express();
import path from "path";
import url from "url";

// Database Connection
import connectDB from "./db/connect.js";

// Extra Packages
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

// Routes
import UrlRouter from "./routes/UrlRouter.js";
import QrcodeRouter from "./routes/QrcodeRouter.js";

// Error Handlers
import ErrorHandlerMiddleware from "./middleware/error-handler.js";
import NotFoundMiddleware from "./middleware/not-found.js";

// CronJob
import cronJob from "./cron_job/index.js";

// Others
import { createBot } from "./service/TelegramBotService.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("trust proxy", 1);
app.use(express.json());
app.use(morgan("tiny"));

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());

app.use(express.static(path.resolve(__dirname, "./client/dist")));

// Routes
app.use("/", UrlRouter);
app.use("/", QrcodeRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
// });

// Error
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database Connected");

    createBot({ token: process.env.TELEGRAM_BOT_TOKEN });

    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
    cronJob();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
