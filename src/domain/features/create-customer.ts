import { Customer } from '@/domain/models/customer'

export interface CreateCustomer {
  execute(params: CreateCustomer.params): Customer
}

export namespace CreateCustomer {
  export type params = {
    name: string
    document: string
    email: string
  }
}
