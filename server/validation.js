const { body, validationResult } = require('express-validator');


export const postValidation = body('username').isEmail(),
// password must be at least 5 chars long
body('password').isLength({ min: 5 }),};