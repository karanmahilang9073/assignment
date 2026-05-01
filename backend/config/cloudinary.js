import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "djljykcze",
  api_key: "225576356537517",
  api_secret: "Olk6m7Bsq39au5A0OQMq2oxwqpU",
});

console.log("✓ Cloudinary configured successfully");

export default cloudinary;
