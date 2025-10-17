require('dotenv').config();
const express = require('express');
const app = express();
const movieRouter = require('./routes/movie');
const userRouter = require('./routes/user');
const aiRouter = require('./routes/ai');
var cors = require('cors');
const {
  customHeader,
  blocker,
  logger,
} = require('./middlewares/custom-middlewares');
const connectDb = require('./db/connectDb');
const notFound = require('./middlewares/notFound');

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json()); // allows to use json easily
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(blocker);

app.use(customHeader);

app.use('/movies', movieRouter);
app.use('/user', userRouter);
app.use('/ai', aiRouter);
app.use(notFound);

// plain text
// app.get('/', (req, res) => {
//   res.send('This is the power of nodemon, Hello word');
// });

// // JSON RESPONSE
// app.get('/movies', (req, res) => {
//   res.json({ success: true, data: movies, totalAmountOfMovies: movies.length });
// });

app.listen(PORT, async () => {
  try {
    console.log('Connecting to database...');
    await connectDb(process.env.MONGODB_URI);
    console.log('Mongodb conenction is done..');
    console.log(`This is our first express app on port: ${PORT}`);
  } catch (error) {
    console.log('An error occurred.');
    console.log(error.message);
  }
});

// async function milk (){
//   await heatMilk() //=> promise

// }

// const milk  = async()=>{

// }

// function playwith()

// models => the data schema is set
//controllers => help with the logic of our code
// route => where routes are handles
//utils
//db => wher
