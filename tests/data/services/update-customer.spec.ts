import { Customer } from '@/domain/models'
import { mock, MockProxy } from 'jest-mock-extended'
import { ICustomerRepository } from '@/data/contracts/repositories'
import { UpdateCustomerService } from '@/data/services'
import { UpdateUserError } from '@/domain/errors/update-user'

describe('UpdateCustomerService', () => {
  let customerAccountRepoSpy: MockProxy<ICustomerRepository>

  let sut: UpdateCustomerService

  beforeEach(() => {
    customerAccountRepoSpy = mock<ICustomerRepository>()

    sut = new UpdateCustomerService(customerAccountRepoSpy)
  })

  const customer: Customer = {
    id: 'any_id',
    name: 'any_name',
    document: 'any_document',
    email: 'any_email@email.com'
  }

  it('should throw if customer does not exists', async () => {
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountById').mockResolvedValueOnce(undefined)

    const result = await sut.execute({ id: 'any_id' })

    expect(result).toEqual(new UpdateUserError())
  })

  it('should call getCustomerAccountById only once', async () => {
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountById').mockResolvedValueOnce(undefined)

    await sut.execute({ id: 'any_id' })

    expect(customerAccountRepoSpy.getCustomerAccountById).toBeCalledTimes(1)
  })

  it('should throw if email already exists', async () => {
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountById').mockResolvedValueOnce(customer)
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountByEmail').mockResolvedValueOnce(customer)

    const result = await sut.execute(customer)

    expect(result).toEqual(new UpdateUserError())
  })

  it('should call getCustomerAccountByEmail only once if email provided', async () => {
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountById').mockResolvedValueOnce(customer)
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountByEmail').mockResolvedValueOnce(undefined)

    await sut.execute({ id: 'any_id', email: 'new@email.com' })

    expect(customerAccountRepoSpy.getCustomerAccountByEmail).toBeCalledTimes(1)
  })

  it('should not call getCustomerAccountByEmail if email not provided', async () => {
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountById').mockResolvedValueOnce(customer)

    await sut.execute({ id: 'any_id' })

    expect(customerAccountRepoSpy.getCustomerAccountByEmail).toBeCalledTimes(0)
  })

  it('should return a customer if updated successfully', async () => {
    const email = 'new@email.com'

    const document = '12312345611'

    const customerUpdated: Customer = {
      id: customer.id,
      name: customer.name,
      email,
      document
    }
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountById').mockResolvedValueOnce(customer)
    jest.spyOn(customerAccountRepoSpy, 'getCustomerAccountByEmail').mockResolvedValueOnce(undefined)
    jest.spyOn(customerAccountRepoSpy, 'updateCustomerAccount').mockResolvedValueOnce(customerUpdated)

    const result = await sut.execute({ id: customerUpdated.id, email, document })

    expect((result as Customer).email).toEqual('new@email.com')
    expect((result as Customer).document).toEqual('12312345611')
  })
})
