import joi, { Schema } from 'joi';

const signUpSchema: Schema = joi.object({
  email: joi.string()
    .email()
    .max(50)
    .required()
    .messages({
      'string.base': 'Email must be a text',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email must be at most 50 characters long',
      'any.required': 'Email field is required'
    }),
  password: joi.string()
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.base': 'Password must be a text',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be at most 16 characters long',
      'any.required': 'Password field is required'
    }),
  passwordConfirm: joi.string()
    .required()
    .messages({
      'string.base': 'Password confirmation must be a text',
      'any.required': 'Password confirmation field is required'
    })
});

export default signUpSchema;