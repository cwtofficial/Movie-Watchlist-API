const router = require('express').Router();
const {
  createMovie,
  getMovieById,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getAllUserMovies,
} = require('../controllers/movies');
const authorization = require('../middlewares/authorization');

router.get('/movie/:id', getMovieById);
router.get('/get-all-movies', getAllMovies);

router.patch('/update-movie/:id', updateMovie);
router.delete('/delete-movie/:id', deleteMovie);
// router.get('/users/:userId/movies/:movieId', getUserAndMovie);
// router.get('/blocked', blockedEndpoint);

//AUTHORIZED ROUTES
router.use(authorization);

router.get('/get-all-user-movies', getAllUserMovies);
router.post('/create-movie', createMovie);

module.exports = router;
