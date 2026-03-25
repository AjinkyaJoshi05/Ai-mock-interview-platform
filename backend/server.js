import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});