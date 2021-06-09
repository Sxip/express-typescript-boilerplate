import { celebrate, Joi, Segments } from 'celebrate'

/**
 * Login validation.
 * 
 * @public
 */
export const LoginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string()
      .trim()
      .lowercase()
      .required(),
    password: Joi.string()
      .required(),
  }),
})
