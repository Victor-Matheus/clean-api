import { Customer } from '@/domain/models'

export interface UpdateCustomer {
  execute(params: UpdateCustomer.params): UpdateCustomer.result
}

export namespace UpdateCustomer {
  export type params = {
    id: string
    name: string
    document: string
    email: string
  }

  export type result = Promise<Customer | undefined>
}
