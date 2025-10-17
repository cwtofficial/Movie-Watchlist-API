const router = require('express').Router();

const { getAiRecommendation, analyzeMovie } = require('../controllers/ai');
const authorization = require('../middlewares/authorization');

router.get('/recommendation', authorization, getAiRecommendation);
router.post('/analyze', authorization, analyzeMovie);

module.exports = router;
