import { Compare } from '@/domain/forum/application/cryptography/compare'
import { Hasher } from '@/domain/forum/application/cryptography/hasher'

export class FakeHasher implements Hasher, Compare {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async comapre(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
