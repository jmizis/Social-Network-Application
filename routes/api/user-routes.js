const router = require('express').Router();
const {
  // Exported functions from user controller
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriends,
  deleteFriend,
} = require('../../controllers/user-controller');


//  3001/api/users
router.route('/').get(getAllUsers).post(createUser)
// 3001/api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser)
// `/api/users/:userId/friends/:friendId`
router.route ('/:userId/friends/:friendsId').post(addFriends).delete(deleteFriend)
module.exports = router;
