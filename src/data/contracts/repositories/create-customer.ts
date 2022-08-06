import { Customer } from '@/domain/models/customer'

export interface ICreateCustomer {
  createCustomerAccount(params: ICreateCustomer.params): ICreateCustomer.result
}

export namespace ICreateCustomer {
  export type params = Customer

  export type result = Promise<Customer>
}
