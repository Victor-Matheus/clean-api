import { GenerateUniqueIdService } from '@/data/contracts/services'
import { v4 as uuid } from 'uuid'

export class UuidAdapter implements GenerateUniqueIdService {
  generateUniqueId (): string {
    return uuid()
  }
}
