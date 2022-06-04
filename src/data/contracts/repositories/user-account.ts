export interface IUserAccountRepository {
  getUserAccountByEmail(email: string): Promise<IUserAccountRepository.Result>
}

export namespace IUserAccountRepository {
  export type Result = {email: string} | undefined
}
