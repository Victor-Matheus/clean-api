import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

interface FacebookAuthentication {
  auth: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}

export { FacebookAuthentication }
