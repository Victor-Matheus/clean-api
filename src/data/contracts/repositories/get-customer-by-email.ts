import { Customer } from '@/domain/models/customer'

export interface IGetCustomerByEmail {
  getCustomerAccountByEmail(email: string): Promise<IGetCustomerByEmail.Result>
}

export namespace IGetCustomerByEmail {
  export type Result = Customer | undefined
}
