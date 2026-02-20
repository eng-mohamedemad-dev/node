const joi = require('joi');

// المسؤولية: التحقق من صحة البيانات (Validation) قبل الوصول للـ Controller

const createProductSchema = joi.object({
  name: joi.string().trim().min(3).max(100).required(),
  price: joi.number().positive().required(),
  description: joi.string().trim().allow('').optional()
});

const updateProductSchema = joi.object({
  name: joi.string().trim().min(3).max(100).optional(),
  price: joi.number().positive().optional(),
  description: joi.string().trim().allow('').optional()
}).min(1);

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: true,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, error: error.details[0].message });
  }

  next();
};

module.exports = {
  validateCreateProduct: validate(createProductSchema),
  validateUpdateProduct: validate(updateProductSchema)
};