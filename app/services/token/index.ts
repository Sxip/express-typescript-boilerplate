import { TokenModel } from '@/app/shared/models'
import { User, RefreshToken } from '@/entities'
import { ACCESS_TOKEN_EXPIRES_IN, JWT_PRIVATE_KEY, REFRESH_TOKEN_EXPIRES_IN } from 'config'
import { sign, verify } from 'jsonwebtoken'
import { randomBytes } from 'crypto'

export class TokenService {
  /**
   * Generates the session tokens.
   * 
   * @param user
   * @public
   */
  public static async generateToken (user: User): Promise<TokenModel> {
    const accessToken = sign({
      id: user.id,
      username: user.username,
    }, JWT_PRIVATE_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN / 1000,
      subject: user.id.toString(),
    })

    const refreshToken = randomBytes(128).toString('base64')

    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN),
    }).save()

    return { access_token: accessToken, refresh_token: refreshToken, expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  }

  /**
   * Verifies a access token.
   * 
   * @param token 
   * @public
   */
  public static verify (token: string): any {
    return verify(token, JWT_PRIVATE_KEY)
  }

  /**
   * Finds a token.
   * 
   * @param token 
   * @public
   */
  public static async findToken (token: string): Promise<RefreshToken | undefined> {
    return await RefreshToken.findOne({
      where: { token },
      relations: [
        'user',
      ],
    })
  }

  /**
   * Destroys the provided refresh token.
   * 
   * @param userId
   * @param token
   */
  public static async destroyRefreshToken (userId: number, token: string): Promise<void> {
    const deletedToken = RefreshToken.createQueryBuilder('token')
      .delete()
      .from(RefreshToken)
      .where('token.user_id = :id AND token.token = :token', {
        id: userId,
        token,
      })
      .execute()

    console.log(deletedToken)
  }
}
