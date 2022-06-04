import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock } from 'jest-mock-extended'
import { ILoadFacebookUserApi } from '../contracts/apis'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct params', async () => {
    const loadFacebookUserApiSpy = mock<ILoadFacebookUserApi>()

    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    await sut.auth({ token: 'anyToken' })

    expect(loadFacebookUserApiSpy.getUserByToken).toHaveBeenCalledWith('anyToken')
  })

  it('should return AuthenticationError if LoadFacebookApi returns undefined', async () => {
    const loadFacebookUserApiSpy = mock<ILoadFacebookUserApi>()

    loadFacebookUserApiSpy.getUserByToken.mockResolvedValueOnce(undefined)

    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    const authResult = await sut.auth({ token: 'token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
