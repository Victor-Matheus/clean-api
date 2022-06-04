import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'
import { ILoadFacebookUserApi } from '@/data/contracts/apis'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApiSpy: MockProxy<ILoadFacebookUserApi>

  let sut: FacebookAuthenticationService

  const token = 'anyToken'

  beforeEach(() => {
    loadFacebookUserApiSpy = mock<ILoadFacebookUserApi>()

    sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)
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
})
