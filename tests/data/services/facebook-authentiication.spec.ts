import { AuthenticationError } from '@/domain/errors'
import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'

class LoadFacebookUserApiSpy implements ILoadFacebookUserApi {
  token?: string
  result?: undefined
  async getUserByToken (token: string): Promise<ILoadFacebookUserApi.GetUserBytokenResult> {
    this.token = token

    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct params', async () => {
    const loadFacebookUserByApiSpy = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByApiSpy)

    await sut.auth({ token: 'token' })

    expect(loadFacebookUserByApiSpy.token).toBe('token')
  })

  it('should return return AuthenticationError if LoadFacebookApi returns undefined', async () => {
    const loadFacebookUserByApiSpy = new LoadFacebookUserApiSpy()

    loadFacebookUserByApiSpy.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserByApiSpy)

    const authResult = await sut.auth({ token: 'token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
