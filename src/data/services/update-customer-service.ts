import { UpdateUserError } from '@/domain/errors/update-user'
import { UpdateCustomer } from '@/domain/features/update-customer'
import { ICustomerRepository } from '../contracts/repositories'

export class UpdateCustomerService implements UpdateCustomer {
  constructor (
    private readonly customerAccountRepository: ICustomerRepository
  ) {}

  async execute (params: UpdateCustomer.params): UpdateCustomer.result {
    const customer = await this.customerAccountRepository.getCustomerAccountById(params.id)

    if (customer == null) return new UpdateUserError()

    if (params.email != null) {
      const emailAlreadyInUse = await this.customerAccountRepository.getCustomerAccountByEmail(params.email)

      if (emailAlreadyInUse != null) return new UpdateUserError()
    }
  }
}
