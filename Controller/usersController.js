const user = require("../Schema/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const userProfile = require('../Schema/usersProfile');

exports.creatUser = async (req, res) => {
  try {
    const { name, email, password,phonNumber } = req.body;

    var hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
      console.log("hash password:", hashPassword);
    } catch (err) {
      console.log(err);
    }

    const response = await user.create({ name, email, password: hashPassword,phonNumber });
    res.status(200).json({
      status: "success",
      data: response,
      message: "successfully creat Users on db",
    });
    
  } catch (error) {
    res.status(5001).json({
        status: "Un success",
        data: response,
        message: "Some thing went to wrong",
      });
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find email in database exist or not 
    const dbemail = await user.findOne({ email });
    console.log(dbemail);
    if (!dbemail) {
      // User not found
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    //get password and dcrypt password return true if password is match
    const isPasswordValid = await bcrypt.compare(password, dbemail.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    } else {
      const secretKey = "Ayush";
      const payload = {
        userId: dbemail.id,
        useremail: email,
        username: password,
      };
      console.log(payload);
      // Creat a JWT toket
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      // send Token in headers

    //   res.header('Authorization', `Bearer ${token}`);

      // send token in cookies

    //   res.cookie('token', token, { httpOnly: true});
      console.log(token);
      res.status(200).json({
        status: "success",
        data: token,
        message: "successfully login user",
      });
      // Decode the token and Varify by secretkey 
      const varifyToken= jwt.verify(token,secretKey);
      console.log(varifyToken);
    }
  } catch (err) {
    console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to process the request',
        });
  }
};
