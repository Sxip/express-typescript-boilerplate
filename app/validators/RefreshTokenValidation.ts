import { celebrate, Joi, Segments } from 'celebrate'

/**
 * Refresh token validation.
 * 
 * @public
 */
export const RefreshTokenValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string()
      .required(),
  }),
})
