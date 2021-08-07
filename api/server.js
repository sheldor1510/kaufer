const express = require('express');
const cors = require("cors");

require('dotenv').config()

const app = express();

const twitterRouter = require('./routes/twitter')
const youtubeRouter = require('./routes/youtube')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/yt', youtubeRouter)
app.use('/tw', twitterRouter)
app.use('/', (req, res) => { res.redirect('https://github.com/sheldor1510/kaufer') })

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`)); 