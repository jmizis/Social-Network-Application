const router = require('express').Router();
const {
  // Exported functions from thought-controller
  getAllThoughts,
  getThoughtsById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// Use exported functions from line 3 to create routes
router.route('/').get(getAllThoughts).post(createThought)

router.route('/:ThoughtId').get(getThoughtsById).put(updateThought).delete(deleteThought)
router.route('/:ThoughtId/reactions').post(createReaction)
router.route('/:ThoughtId/reactions/:reactionId').delete(deleteReaction)
module.exports = router;
