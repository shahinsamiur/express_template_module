// import multer, { FileFilterCallback } from "multer";
// import path from "path";
// import { Request } from "express";

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void,
//   ) => {
//     cb(null, "uploads/");
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, filename: string) => void,
//   ) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Configure file filter
// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback,
// ): void => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (ext === ".zip") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only ZIP files allowed"));
//   }
// };

// // Initialize multer
// const upload = multer({ storage, fileFilter });

// export default upload;
