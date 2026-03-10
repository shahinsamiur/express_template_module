import dotenv from "dotenv";
dotenv.config();

import app from "./app";
// import { testDBConnection } from "./config/supabase_db";
import connectDB from "./config/mongodb_db";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // await testDBConnection();
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
