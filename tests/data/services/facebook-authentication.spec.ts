import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'
import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { IUserAccountRepository } from '../contracts/repositories'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApiSpy: MockProxy<ILoadFacebookUserApi>

  let userAccountRepoSpy: MockProxy<IUserAccountRepository>

  let sut: FacebookAuthenticationService

  const token = 'anyToken'

  beforeEach(() => {
    loadFacebookUserApiSpy = mock<ILoadFacebookUserApi>()
    userAccountRepoSpy = mock<IUserAccountRepository>()

    sut = new FacebookAuthenticationService(loadFacebookUserApiSpy, userAccountRepoSpy)
  })

  it('should call LoadFacebookApi with correct params', async () => {
    await sut.auth({ token })

    expect(loadFacebookUserApiSpy.getUserByToken).toHaveBeenCalledWith(token)
  })

  it('should return AuthenticationError if LoadFacebookApi returns undefined', async () => {
    loadFacebookUserApiSpy.getUserByToken.mockResolvedValueOnce(undefined)

    const authResult = await sut.auth({ token: 'token' })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should throws if user with email not exists', async () => {
    loadFacebookUserApiSpy.getUserByToken.mockResolvedValueOnce(undefined)

    const authResult = await sut.auth({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
