const express = require('express');
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const createConnection = require('./connections');
// const URL = require('./models/url');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

createConnection('mongodb://localhost:27017/short-url')
.then(() => console.log('Mongodb Connected Succesfully'))
.catch((err) => console.log("Something Went Wrong", err.message));

app.use(express.urlencoded({extended:false}));

// app.get("/test", async function(req, res) {
//     return res.render('home');
// });

app.use('/url', urlRouter);
app.use('/static', staticRouter)

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));