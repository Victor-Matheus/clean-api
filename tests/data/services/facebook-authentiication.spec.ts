import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'

class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly loadFacebookUserByApi: ILoadFacebookUserApi
  ) {}

  async auth (params: FacebookAuthentication.Params): Promise<AccessToken | AuthenticationError> {
    await this.loadFacebookUserByApi.getUserByToken(params.token)

    return { accessToken: '' }
  }
}

interface ILoadFacebookUserApi {
  getUserByToken(token: string): Promise<void>
}

class LoadFacebookUserByApiSpy implements ILoadFacebookUserApi {
  token?: string

  async getUserByToken (token: string): Promise<void> {
    this.token = token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct params', async () => {
    const loadFacebookUserByApiSpy = new LoadFacebookUserByApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByApiSpy)

    await sut.auth({ token: 'token' })

    expect(loadFacebookUserByApiSpy.token).toBe('token')
  })
})
