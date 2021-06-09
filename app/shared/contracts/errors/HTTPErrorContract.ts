import { Info } from 'verror'

export interface HTTPErrorContract {
  cause?: Error | any | null
  name?: string
  message?: string
  info?: Info
  status?: number
  expose?: boolean
}
