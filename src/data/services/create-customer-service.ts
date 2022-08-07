import { CreateUserError } from '@/domain/errors/create-user'
import { CreateCustomer } from '@/domain/features/create-customer'
import { Customer } from '@/domain/models/customer'
import { ICustomerRepository } from '@/data/contracts/repositories'
import { GenerateUniqueIdService } from '@/data/contracts/services/generate-unique-id'

export class CreateCustomerService implements CreateCustomer {
  constructor (
    private readonly customerAccountRepository: ICustomerRepository,
    private readonly generateUniqueIdService: GenerateUniqueIdService
  ) {}

  async execute (params: CreateCustomer.params): Promise<Customer | CreateUserError> {
    const customer: Customer = {
      ...params,
      id: this.generateUniqueIdService.generateUniqueId()
    }

    const customerAlreadyExists = await this.customerAccountRepository.getCustomerAccountByEmail(customer.email)

    if (customerAlreadyExists !== undefined) return new CreateUserError()

    return await this.customerAccountRepository.createCustomerAccount(customer)
  }
}
