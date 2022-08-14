import { Customer } from '@/domain/models/customer'
import { CreateUserError } from '../errors/create-user'

interface CreateCustomer {
  execute(params: CreateCustomer.params): CreateCustomer.result
}

namespace CreateCustomer {
  export type params = {
    name: string
    document: string
    email: string
  }

  export type result = Promise<Customer | CreateUserError>

}

export { CreateCustomer }
