import { Customer } from '@/domain/models/customer'

interface IGetCustomerById {
  getCustomerAccountById(id: string): Promise<IGetCustomerById.Result>
}

namespace IGetCustomerById {
  export type Result = Customer | undefined
}

export { IGetCustomerById }
