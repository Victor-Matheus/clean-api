import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct params', async () => {
    const loadFacebookUserApiSpy = {
      getUserByToken: jest.fn()
    }
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    await sut.auth({ token: 'anyToken' })

    expect(loadFacebookUserApiSpy.getUserByToken).toHaveBeenCalledWith('anyToken')
  })

  it('should return return AuthenticationError if LoadFacebookApi returns undefined', async () => {
    const loadFacebookUserApiSpy = {
      getUserByToken: jest.fn()
    }

    loadFacebookUserApiSpy.getUserByToken.mockResolvedValueOnce(undefined)

    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    const authResult = await sut.auth({ token: 'token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
