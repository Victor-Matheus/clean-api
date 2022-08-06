export interface ILoadFacebookUserApi {
  getUserByToken(token: string): Promise<IFacebookUserApi.GetUserBytokenResult>
}

export namespace IFacebookUserApi {
  export type GetUserBytokenResult = {
    id: string
    email: string
    name: string
  } | undefined
}
