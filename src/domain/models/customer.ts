import { User } from './user'

export type Customer = User & {
  name: string
  document: string
  email: string
}
