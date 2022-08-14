import { UpdateCustomer } from '@/domain/features/update-customer'
import { ICustomerRepository } from '../contracts/repositories'

export class UpdateCustomerService implements UpdateCustomer {
  constructor (
    private readonly customerAccountRepository: ICustomerRepository
  ) {}

  async execute (params: UpdateCustomer.params): UpdateCustomer.result {
    throw new Error('Method not implemented.')
  }
}
