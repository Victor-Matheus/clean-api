import { Customer } from '@/domain/models'
import { UpdateUserError } from '../errors/update-user'

interface UpdateCustomer {
  execute(params: UpdateCustomer.params): UpdateCustomer.result
}

namespace UpdateCustomer {
  export type params = {
    id: string
    name?: string
    document?: string
    email?: string
  }

  export type result = Promise<Customer | undefined | UpdateUserError>
}

export { UpdateCustomer }
