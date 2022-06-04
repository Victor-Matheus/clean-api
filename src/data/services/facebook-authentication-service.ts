import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { IUserAccountRepository } from '../contracts/repositories'

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly loadFacebookUserByApi: ILoadFacebookUserApi,
    private readonly userAccountRepository: IUserAccountRepository
  ) {}

  async auth (params: FacebookAuthentication.Params): Promise<AccessToken | AuthenticationError> {
    const facebookUserFound = await this.loadFacebookUserByApi.getUserByToken(params.token)

    if (facebookUserFound === undefined) return new AuthenticationError()

    const userExists = await this.userAccountRepository.getUserAccountByEmail(facebookUserFound.email)

    if (userExists === undefined) return new AuthenticationError()

    return { accessToken: 'accessToken' }
  }
}
