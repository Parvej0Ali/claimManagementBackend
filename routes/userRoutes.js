const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               userName:
 *                 type: string
 *                 description: The username of the user.
 *     responses:
 *       '201':
 *         description: Successfully created a new user.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Endpoint to retrieve all users.
 *     responses:
 *       '200':
 *         description: A list of users.
 *       '500':
 *         description: Internal server error.
 */

// securityDefinitions:
//   BearerAuth:
//     type: apiKey
//     name: Authorization
//     in: header

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Endpoint to retrieve a user by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve.

 *     responses:
 *       '200':
 *         description: User details retrieved successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Endpoint to update a user by its ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update.
 *       - in: body
 *         name: userData
 *         description: The updated user data.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             // Add properties of the userData object here
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Endpoint to delete a user by its ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

router.post('/users', userController.createUser);
router.post('/Login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', authMiddleware.authenticateUser, userController.getUserById);
router.patch('/users/:id', authMiddleware.authenticateUser, userController.updateUser);
router.put('/users', authMiddleware.authenticateUser, userController.updateUser);
router.delete('/users/:id', authMiddleware.authenticateUser, userController.deleteUser);
router.patch('/users/:id/delete-policy', authMiddleware.authenticateUser, userController.deletePolicyFromUser);


// Define other routes for users
module.exports = router;
