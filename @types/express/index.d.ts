import { UserModel } from '../../app/shared/models/UserModel'

declare module 'express-serve-static-core' {
  export interface Request {
    user: UserModel
  }
}
