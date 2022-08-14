export class UpdateUserError extends Error {
  constructor (details?: Record<string, unknown>) {
    super('user update failed')
    this.name = 'UpdateUserError'
    this.stack = String(details)
  }
}
