import { TokenModel } from '@/app/shared/models'
import { BadCredentialsError, InvalidTokenError, ExpiredTokenError } from '@/errors'
import { User } from '@/entities'
import { TokenService } from '@/services'
import { ACCESS_TOKEN_EXPIRES_IN } from 'config'

export class AuthenticationService {
  /**
   * Authenticates by username.
   * 
   * @param username
   * @param password
   * @public
   */
  public static async authenticateWithUsername (username: string, password: string): Promise<TokenModel> {
    const user = await User.authenticate(username, password)
    if (!user) {
      throw new BadCredentialsError({
        message: 'Username or password is incorrect.',
      })
    }

    return TokenService.generateToken(user)
  }

  /**
   * Removes the user from the request and deletes the active refresh token.
   * 
   * @param user
   * @param token
   * @public
   */
  public static async logout (userId: number, token: string): Promise<void> {
    await TokenService.destroyRefreshToken(userId, token)
  }

  /**
   * Refreshes the provided token.
   * 
   * @param token 
   * @public
   */
  public static async refresh (token: string): Promise<TokenModel> {
    const oldRefreshToken = await TokenService.findToken(token)
    if (!oldRefreshToken) {
      throw new InvalidTokenError()
    }

    if (oldRefreshToken.expiresAt < new Date()) {
      throw new ExpiredTokenError({
        info: {
          expiresAt: oldRefreshToken.expiresAt,
        },
      })
    }

    const { access_token, refresh_token: new_refresh_token } = await TokenService.generateToken(
      oldRefreshToken.user
    )

    await oldRefreshToken.remove()

    return { access_token, refresh_token: new_refresh_token, expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  }
}
