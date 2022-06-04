export interface ILoadFacebookUserApi {
  getUserByToken(token: string): Promise<ILoadFacebookUserApi.GetUserBytokenResult>
}

export namespace ILoadFacebookUserApi {
  export type GetUserBytokenResult = string | undefined
}
