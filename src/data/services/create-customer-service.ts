import { CreateCustomer } from '@/domain/features/create-customer'
import { Customer } from '@/domain/models/customer'
import { ICustomerRepository } from '../contracts/repositories'

export class CreateCustomerService implements CreateCustomer {
  constructor (
    private readonly customerAccountRepository: ICustomerRepository
  ) {}

  async execute (params: CreateCustomer.params): Promise<Customer> {
    throw new Error('Method not implemented.')
  }
}
