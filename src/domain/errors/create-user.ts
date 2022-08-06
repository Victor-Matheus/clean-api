export class CreateUserError extends Error {
  constructor () {
    super('user register failed')
    this.name = 'CreateUserError'
  }
}
