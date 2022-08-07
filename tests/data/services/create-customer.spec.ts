import { Customer } from '@/domain/models/customer'
import { MockProxy, mock } from 'jest-mock-extended'
import { ICustomerRepository } from '@/data/contracts/repositories'
import { CreateCustomerService } from '@/data/services'
import { CreateUserError } from '@/domain/errors/create-user'
import { GenerateUniqueIdService } from '@/data/contracts/services'

describe('CreateCustomerService', () => {
  let customerAccountRepoSpy: MockProxy<ICustomerRepository>

  let generateUniqueIdService: MockProxy<GenerateUniqueIdService>

  let sut: CreateCustomerService

  beforeEach(() => {
    customerAccountRepoSpy = mock<ICustomerRepository>()

    generateUniqueIdService = mock<GenerateUniqueIdService>()

    sut = new CreateCustomerService(customerAccountRepoSpy, generateUniqueIdService)
  })

  const customer: Customer = {
    id: 'any_id',
    name: 'any_name',
    document: 'any_document',
    email: 'any_email@email.com'
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

  it('should call createCustomerAccount repository with correct values', async () => {
    jest.spyOn(generateUniqueIdService, 'generateUniqueId').mockImplementationOnce(() => customer.id)

    await sut.execute(customer)

    expect(customerAccountRepoSpy.createCustomerAccount).toBeCalledWith(customer)
  })

  it('should call createCustomerAccount repository only once', async () => {
    await sut.execute(customer)

    expect(customerAccountRepoSpy.createCustomerAccount).toBeCalledTimes(1)
  })
})
