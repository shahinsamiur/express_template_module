import mongoose from "mongoose";
// 6INJhMJaZlXjTDuT
// shahinsamiur_db_user;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL_MONGODB);
        console.log("MongoDB Connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
export default connectDB;
