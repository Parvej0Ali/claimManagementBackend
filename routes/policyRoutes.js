const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');


/**
 * @swagger
 * /api/policies:
 *   post:
 *     summary: Create a new policy
 *     description: Endpoint to create a new policy.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyName:
 *                 type: string
 *                 description: The name of the policy.
 *               startDate:
 *                 type: string
 *                 description: Start date of policy.
 *               endDate:
 *                 type: string
 *                 description: End date of policy.
 *               premiumAmount:
 *                 type: number
 *                 description: The premium amount of the policy.
 *               sumAssured:
 *                  type: number
 *                  description: The sum assured amount of the policy
 *               paymentFrequency:
 *                 type: string
 *                 description: The frequency of the policy.
 *     responses:
 *       '201':
 *         description: Successfully created a new policy.
 *       '400':
 *         description: Bad request. Invalid input data.
 * 
 */
/**
 * @swagger
 * /api/policies:
 *   get:
 *     summary: Retrieve all policies
 *     description: Endpoint to retrieve all policies.
 *     responses:
 *       '200':
 *         description: A list of policies.
 *       '500':
 *         description: Internal server error.
 */

//get policy by pid
/**
 * @swagger
 * /api/policies/{policyId}:
 *   get:
 *     summary: Retrieve a policy by ID
 *     description: Endpoint to retrieve a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: policyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the policy to retrieve.
 *     responses:
 *       '200':
 *         description: Policy details retrieved successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Policy not found.
 *       '500':
 *         description: Internal server error.
 */

//update policy id
/**
 * @swagger
 * /api/policies/{policyId}:
 *   patch:
 *     summary: Update a policy by ID
 *     description: Endpoint to update a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: policyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the policy to update.
 *       - in: body
 *         name: policyData
 *         description: The updated policy data.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             // Add properties of the policyData object here
 *     responses:
 *       '200':
 *         description: Policy updated successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Policy not found.
 *       '500':
 *         description: Internal server error.
 */

//delete policy
/**
 * @swagger
 * /api/policies/{policyId}:
 *   delete:
 *     summary: Delete a policy by ID
 *     description: Endpoint to delete a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: policyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the policy to delete.
 *     responses:
 *       '200':
 *         description: Policy deleted successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Policy not found.
 *       '500':
 *         description: Internal server error.
 */

// Routes for policies
router.post('/policies', policyController.createPolicy);
router.get('/policies', policyController.getPolicies);
router.get('/policies/:id', policyController.getPolicyById);
router.put('/policies/:id', policyController.updatePolicy);
router.patch('/policies/:id', policyController.updatePolicy);
router.delete('/policies/:id', policyController.deletePolicy);

module.exports = router;
