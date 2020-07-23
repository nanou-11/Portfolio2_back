const Joi = require("@hapi/joi");

const userForPut = Joi.object({
  lastName: Joi.string(),
  firstName: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  github: Joi.string(),
  linkedin: Joi.string(),
});

const aboutForPut = Joi.object({
  about: Joi.string(),
  cv: Joi.string(),
  UserId: Joi.string(),
});

const validator = (schema, propToValidate) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[propToValidate], { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.details.map((err) => ({
      message: err.message,
      type: err.type,
    }));
    res.status(422).json({
      status: 422,
      message: err.message,
      errors,
    });
  }
};

module.exports = {
  validator,
  userForPut,
  aboutForPut,
};
