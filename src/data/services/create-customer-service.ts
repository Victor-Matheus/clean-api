import { CreateCustomer } from '@/domain/features/create-customer'
import { Customer } from '@/domain/models/customer'

export class CreateCustomerService implements CreateCustomer {
  execute (params: CreateCustomer.params): Customer {
    throw new Error('Method not implemented.')
  }
}
