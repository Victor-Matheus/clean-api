import { Customer } from '@/domain/models/customer'

interface IUpdateCustomer {
  updateCustomerAccount(params: IUpdateCustomer.params): IUpdateCustomer.result
}

namespace IUpdateCustomer {
  export type params = Customer

  export type result = Promise<Customer>
}

export { IUpdateCustomer }
