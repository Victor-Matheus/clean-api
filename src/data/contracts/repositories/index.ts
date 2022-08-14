import { IGetCustomerByEmail } from './get-customer-by-email'
import { ICreateCustomer } from './create-customer'
import { IGetCustomerById } from './get-customer-by-id'

export * from './get-customer-by-email'
export * from './create-customer'

export interface ICustomerRepository extends IGetCustomerByEmail, ICreateCustomer, IGetCustomerById {}
