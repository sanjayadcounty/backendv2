const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());


app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://192.168.1.82:3000"
  ],
  credentials: true
}));


app.use('/uploads', express.static('uploads'));

// DB
const connectDB = require('./DB/connectDB');
connectDB();

// Routes
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/upload', require('./routes/fileroutes'));
app.use('/api/users', require('./routes/userroutes'));

const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Backend running on http://${HOST}:${PORT}`);
});

// Server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
