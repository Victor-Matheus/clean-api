import { CreateUserError } from '@/domain/errors/create-user'
import { CreateCustomer } from '@/domain/features/create-customer'
import { Customer } from '@/domain/models/customer'
import { ICustomerRepository } from '../contracts/repositories'

export class CreateCustomerService implements CreateCustomer {
  constructor (
    private readonly customerAccountRepository: ICustomerRepository
  ) {}

  async execute (params: CreateCustomer.params): Promise<Customer | CreateUserError> {
    const customer: Customer = {
      ...params,
      id: ''
    }

    const customerAlreadyExists = await this.customerAccountRepository.getCustomerAccountByEmail(customer.email)

    if (customerAlreadyExists !== undefined) return new CreateUserError()

    return await this.customerAccountRepository.createCustomerAccount(customer)
  }
}
