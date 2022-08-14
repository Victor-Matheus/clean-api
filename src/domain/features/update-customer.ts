import { Customer } from '@/domain/models'

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

  export type result = Promise<Customer | undefined>
}

export { UpdateCustomer }
