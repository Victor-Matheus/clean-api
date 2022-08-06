import { IGetCustomerByEmail } from './get-customer-by-email'
import { ICreateCustomer } from './create-customer'

export * from './get-customer-by-email'
export * from './create-customer'

export interface ICustomerRepository extends IGetCustomerByEmail, ICreateCustomer{}
