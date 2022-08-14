export class CreateUserError extends Error {
  constructor (details?: Record<string, unknown>) {
    super('user register failed')
    this.name = 'CreateUserError'
    this.stack = String(details)
  }
}
