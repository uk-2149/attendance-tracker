require('dotenv').config({path: '../.env'})
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express();
app.use(express.json());
app.use(cors());

//error in dotenv
console.log("MongoDB URI:", process.env.MONGODB_URL);
console.log("JWT URI:", process.env.JWT_SECRET);

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/subjects', require('./routes/subjects'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
  }

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));