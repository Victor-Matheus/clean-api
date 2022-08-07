import { Customer } from '@/domain/models/customer'
import { MockProxy, mock } from 'jest-mock-extended'
import { ICustomerRepository } from '@/data/contracts/repositories'
import { CreateCustomerService } from '@/data/services'
import { CreateUserError } from '@/domain/errors/create-user'

describe('CreateCustomerService', () => {
  let customerAccountRepoSpy: MockProxy<ICustomerRepository>

  let sut: CreateCustomerService

  beforeEach(() => {
    customerAccountRepoSpy = mock<ICustomerRepository>()

    sut = new CreateCustomerService(customerAccountRepoSpy)
  })

  const customer: Customer = {
    id: 'any_id',
    name: 'any_name',
    document: 'any_document',
    email: 'any_email@email.com',
    createdAt: new Date()
  }

  it('should throw if email already exists', async () => {
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountByEmail').mockResolvedValueOnce(customer)

    const result = await sut.execute(customer)

    expect(result).toEqual(new CreateUserError())
  })

  it('get customer account by email should called only once', async () => {
    await sut.execute(customer)

    expect(customerAccountRepoSpy.getCustomerAccountByEmail).toBeCalledTimes(1)
  })

  it('should call getCustomerAccountByEmail with correct params', async () => {
    await sut.execute(customer)

    expect(customerAccountRepoSpy.getCustomerAccountByEmail).toBeCalledWith(customer.email)
  })
})
