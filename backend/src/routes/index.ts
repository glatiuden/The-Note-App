import express from "express";
import noteRouter from "./note";

const router = express.Router();

router.use("/note", noteRouter);

export default router;
