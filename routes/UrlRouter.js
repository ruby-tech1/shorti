import express from "express";
const router = express.Router();

import { createShortUrl, getShortUrl } from "../controller/UrlController.js";

router.route("/api/v1/url").post(createShortUrl);
router.route("/u/:id").get(getShortUrl);

export default router;
