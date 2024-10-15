import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JWTEncrypter } from './jwt-encrypter'
import { Compare } from '@/domain/forum/application/cryptography/compare'
import { BcryptHasher } from './bcrypt-hasher'
import { Hasher } from '@/domain/forum/application/cryptography/hasher'

@Module({
  providers: [
    { provide: Encrypter, useClass: JWTEncrypter },
    { provide: Compare, useClass: BcryptHasher },
    { provide: Hasher, useClass: BcryptHasher },
  ],
  exports: [Encrypter, Compare, Hasher],
})
export class CryptographyModule {}
