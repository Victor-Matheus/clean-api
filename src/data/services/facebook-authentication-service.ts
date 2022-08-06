import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { ICustomerRepository } from '@/data/contracts/repositories'

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly facebookUserByApi: ILoadFacebookUserApi,
    private readonly userAccountRepository: ICustomerRepository
  ) {}

  async auth (params: FacebookAuthentication.Params): Promise<AccessToken | AuthenticationError> {
    const facebookUserFound = await this.facebookUserByApi.getUserByToken(params.token)

    if (facebookUserFound === undefined) return new AuthenticationError()

    const userExists = await this.userAccountRepository.getCustomerAccountByEmail(facebookUserFound.email)

    if (userExists === undefined) return new AuthenticationError()

    return { accessToken: 'accessToken' }
  }
}
