import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'

class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly loadFacebookUserByApi: ILoadFacebookUserApi
  ) {}

  async auth (params: FacebookAuthentication.Params): Promise<AccessToken | AuthenticationError> {
    await this.loadFacebookUserByApi.getUserByToken(params.token)

    return new AuthenticationError()
  }
}

interface ILoadFacebookUserApi {
  getUserByToken(token: string): Promise<ILoadFacebookUserApi.GetUserBytokenResult>
}

namespace ILoadFacebookUserApi {
  export type GetUserBytokenResult = string | undefined
}

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
