import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'
import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { IUserAccountRepository } from '../contracts/repositories'

describe('FacebookAuthenticationService', () => {
  let facebookUserApiSpy: MockProxy<ILoadFacebookUserApi>

  let userAccountRepoSpy: MockProxy<IUserAccountRepository>

  let sut: FacebookAuthenticationService

  const token = 'anyToken'

  beforeEach(() => {
    facebookUserApiSpy = mock<ILoadFacebookUserApi>()
    userAccountRepoSpy = mock<IUserAccountRepository>()

    sut = new FacebookAuthenticationService(facebookUserApiSpy, userAccountRepoSpy)
  })

  it('should call LoadFacebookApi with correct params', async () => {
    await sut.auth({ token })

    expect(facebookUserApiSpy.getUserByToken).toHaveBeenCalledWith(token)
  })

  it('should return AuthenticationError if LoadFacebookApi returns undefined', async () => {
    facebookUserApiSpy.getUserByToken.mockResolvedValueOnce(undefined)

    const authResult = await sut.auth({ token: 'token' })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should throws facebookApi returns undefined', async () => {
    facebookUserApiSpy.getUserByToken.mockResolvedValueOnce(undefined)

    const authResult = await sut.auth({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should throws if user with email not exists', async () => {
    userAccountRepoSpy.getUserAccountByEmail.mockResolvedValueOnce(undefined)

    const authResult = await sut.auth({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
