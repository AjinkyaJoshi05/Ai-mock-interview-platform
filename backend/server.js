// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
// import app from "./app.js";
// import dns from 'node:dns';
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";


// dns.setDefaultResultOrder('ipv4first');
// const PORT = process.env.PORT || 5000;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // Serve static files from Vite build
// app.use(
//   express.static(path.join(__dirname, "../frontend/dist"))
// );

// // Catch-all: send React app
// app.use((req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../frontend/dist/index.html")
//   );
// });


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});