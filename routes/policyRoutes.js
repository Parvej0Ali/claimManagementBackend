const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');


// Routes for policies
router.post('/policies', policyController.createPolicy);
router.get('/policies', policyController.getPolicies);
router.get('/policies/getPolicyById/:id', policyController.getPolicyById);
router.put('/policies/updatePolicyById/:id', policyController.updatePolicy);
router.patch('/policies/updatePolicyById/:id', policyController.updatePolicy);
router.delete('/policies/deletePolicyById/:id', policyController.deletePolicy);

module.exports = router;
