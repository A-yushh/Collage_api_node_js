const express= require('express');
const cookieParser = require("cookie-parser");
const connectDb= require('./Dbconnect/connect');
const router =require('./Routers/router')
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
connectDb();
app.get('/', (req, res) => {
  
  res.send('Hello, Express!');
});


app.use('/users',router);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});