// import { Customer } from '@/domain/models'
import { mock, MockProxy } from 'jest-mock-extended'
import { ICustomerRepository } from '@/data/contracts/repositories'
import { UpdateCustomerService } from '@/data/services'

describe('UpdateCustomerService', () => {
  let customerAccountRepoSpy: MockProxy<ICustomerRepository>

  let sut: UpdateCustomerService

  beforeEach(() => {
    customerAccountRepoSpy = mock<ICustomerRepository>()

    sut = new UpdateCustomerService(customerAccountRepoSpy)
  })

  // const customer: Customer = {
  //   id: 'any_id',
  //   name: 'any_name',
  //   document: 'any_document',
  //   email: 'any_email@email.com'
  // }

  it('should throw if customer does not exists', async () => {
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountById').mockResolvedValueOnce(undefined)

    await sut.execute({ id: 'any_id' })
  })
})
