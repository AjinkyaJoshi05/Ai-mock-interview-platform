import express from "express";
import cors from "cors";

import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api/interview", interviewRoutes);

export default app;