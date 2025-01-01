import express from "express";
const router = express.Router();

import { generateQrcodeController } from "../controller/QrCodeController.js";

const rootUrl = "/api/v1/qrcode";

router.route(rootUrl + "/generate").post(generateQrcodeController);

export default router;
