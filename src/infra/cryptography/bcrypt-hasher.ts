/* eslint-disable prettier/prettier */
import { compare as bcompare, hash as bhash } from 'bcryptjs'
import { Compare } from '@/domain/forum/application/cryptography/compare'
import { Hasher } from '@/domain/forum/application/cryptography/hasher'

export class BcryptHasher implements Hasher, Compare {
  
  comapre(plain: string, hash: string): Promise<boolean> {
    return bcompare(plain, hash)
  }

  hash(plain: string): Promise<string> {
    return bhash(plain, 8)
  }
}
