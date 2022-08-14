import { UpdateUserError } from '@/domain/errors/update-user'
import { UpdateCustomer } from '@/domain/features/update-customer'
import { Customer } from '@/domain/models'
import { ICustomerRepository } from '@/data/contracts/repositories'

export class UpdateCustomerService implements UpdateCustomer {
  constructor (
    private readonly customerAccountRepository: ICustomerRepository
  ) {}

  async execute (params: UpdateCustomer.params): UpdateCustomer.result {
    const validationResult = await this.validate(params)

    if (validationResult instanceof UpdateUserError) return validationResult

    return await this.customerAccountRepository.updateCustomerAccount(Object.assign(validationResult, params))
  }

  private async validate (params: UpdateCustomer.params): Promise<Customer | UpdateUserError> {
    const customer = await this.customerAccountRepository.getCustomerAccountById(params.id)

    if (customer == null) return new UpdateUserError()

    const emailAlreadyInUse = params.email != null ? await this.customerAccountRepository.getCustomerAccountByEmail(params.email) : null

    if (emailAlreadyInUse != null) return new UpdateUserError()

    return customer
  }
}
