import { Customer } from '@/domain/models/customer'
import { CreateUserError } from '../errors/create-user'

export interface CreateCustomer {
  execute(params: CreateCustomer.params): CreateCustomer.result
}

export namespace CreateCustomer {
  export type params = {
    name: string
    document: string
    email: string
  }

  export type result = Promise<Customer | CreateUserError>
}
