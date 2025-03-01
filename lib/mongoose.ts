// import mongoose from "mongoose";

// let isConnected: boolean = false;

// export const connectToDatabase = async () => {
//   mongoose.set("strictQuery", true);

//   if (!process.env.MONGODB_URL) {
//     return console.log("Missing MONGODB_URL");
//   }
//   if (isConnected) {
//     return console.log("MongoDB is already connected");
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       dbName: "tshirt-store",
//     });
//     isConnected = true;

//     console.log("MongoDB is connected");
//   } catch (error) {
//     console.log("MongoDB connection failed", error);
//   }
// };

import mongoose from "mongoose";

export const runtime = "nodejs"; // 👈 Forsira Node.js runtime

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("Missing MONGODB_URL");
    return;
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "tshirt-store",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
};
