const mongoose = require('mongoose');
dbUrl='mongodb+srv://ayushpatelid:ayushpatelid@cluster0.sxnhmoq.mongodb.net/GitSignUpSignIn'

const connectDb = async () => {
    try {
      const conn = await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports=connectDb;
