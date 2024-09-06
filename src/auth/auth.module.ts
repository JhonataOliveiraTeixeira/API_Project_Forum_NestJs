import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Env } from 'src/env';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      inject:[ConfigService],
      global: true,
      useFactory(config: ConfigService<Env>){
        const secretKey = config.get('JWT_PRIVATE_KEY')
        const publicKey = config.get('JWT_PUBLIC_KEY')

        return {
          signOptions: {algorithm: 'RS256'},
          privateKey: Buffer.from(secretKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }

      }
    })
  ],
  providers:[JwtStrategy]
})
export class AuthModule {}
