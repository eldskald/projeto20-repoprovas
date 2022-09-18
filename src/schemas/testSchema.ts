import joi, { Schema } from 'joi';

const testSchema: Schema = joi.object({
  name: joi.string()
    .pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]+$/)
    .max(50)
    .required()
    .messages({
      'string.base': 'Name must be a text',
      'string.pattern.base': 'Name must only contain letters, numbers and spaces',
      'string.max': 'Name must be at most 50 characters long',
      'any.required': 'Name field is required'
    }),
  pdfUrl: joi.string()
    .uri()
    .required()
    .messages({
      'string.base': 'PDF URL must be a text',
      'string.uri': 'PDF URL must be a valid URI',
      'any.required': 'PDF URL field is required'
    }),
  category: joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'Category must be a text',
      'string.max': 'Category must be at most 50 characters long',
      'any.required': 'Category field is required'
    }),
  teacher: joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'Teacher must be a text',
      'string.max': 'Teacher must be at most 50 characters long',
      'any.required': 'Teacher field is required'
    }),
  discipline: joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'Discipline must be a text',
      'string.max': 'Discipline must be at most 50 characters long',
      'any.required': 'Discipline field is required'
    }),
});

export default testSchema;