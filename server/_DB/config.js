import mongoose from "mongoose";

const connect = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URL}/imaginexAI`)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      throw Error(error);
    });
};

export default connect;
