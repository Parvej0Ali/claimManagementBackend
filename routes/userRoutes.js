const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/users', userController.createUser);
router.post('/Login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', authMiddleware.authenticateUser, userController.getUserById);
router.patch('/users/:id', userController.updateUser);
router.put('/users', authMiddleware.authenticateUser, userController.updateUser);
router.delete('/users/:id', authMiddleware.authenticateUser, userController.deleteUser);
router.patch('/users/:id/delete-policy', authMiddleware.authenticateUser, userController.deletePolicyFromUser);


// Define other routes for users
module.exports = router;
