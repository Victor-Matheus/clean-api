export interface ILoadFacebookUserApi {
  getUserByToken(token: string): Promise<ILoadFacebookUserApi.GetUserBytokenResult>
}

export namespace ILoadFacebookUserApi {
  export type GetUserBytokenResult = {
    id: string
    email: string
    name: string
  } | undefined
}
