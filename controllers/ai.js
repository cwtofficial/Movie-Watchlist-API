require('dotenv').config();
const OpenAI = require('openai');
const MovieSchema = require('../models/MovieSchema');
const { StatusCodes } = require('http-status-codes');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const testOpenAi = async () => {
//   const response = await client.responses.create({
//     model: 'gpt-5',
//     input: 'Write a one-sentence bedtime story about a unicorn.',
//   });

//   console.log(response.output_text);
// };

// testOpenAi();

const getAiRecommendation = async (req, res) => {
  const { id } = req.user;
  try {
    const userMovies = await MovieSchema.find({ user: id });
    console.log(userMovies);
    if (userMovies.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User  has no movies added yet.',
      });
    }
    const watchedMovies = userMovies.filter(
      (movie) => movie.movieStatus === 'completed',
    );
    const highRatedMovies = watchedMovies.filter((movie) => movie.rating >= 4);

    if (highRatedMovies.length === 0) {
      return res.status(StatusCodes.OK).json({
        message: 'User  has no high rated movies yet.',
      });
    }

    const response = await client.responses.create({
      model: 'gpt-5',
      instructions: 'You are a  movie recommendation expert.',
      input: `Based on the user favourite movie (highly rated):${highRatedMovies
        .map(
          (movie) =>
            `- ${movie.title} ${movie.year} - Rating: ${movie.rating} `,
        )
        .join('\n')}. Please return a JSON object in this format: 
        {
        "recommendations: [
        {"title": "Movie Title",
        "year": 2023,
        "genre": "Action",
        }
        ]}`,
    });
    const recommendations = JSON.parse(response.output_text);

    res.status(StatusCodes.OK).json({
      message: 'This are your recommended movies',
      recommendedMovies: recommendations,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const analyzeMovie = async (req, res) => {
  const { title, year } = req.body;

  if (!title || !year) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Please provide movie title and year',
    });
  }
  try {
    const response = await client.responses.create({
      model: 'gpt-5',
      instructions:
        'You are a  movie analyzer, that provides adequate details.',
      input: `Analyze this movie (this is the movie title : ${title} and the movie year is ${year} ) and send back a response in JSON format, using this template: [{"details": "The movie....", "overallUserRating": 5/10, "genre" :"Sci-fi"}]`,
    });
    const analyzedMovie = JSON.parse(response.output_text);
    res.status(StatusCodes.OK).json({
      message: 'This is our ai take',
      datae: analyzedMovie,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = { getAiRecommendation, analyzeMovie };
