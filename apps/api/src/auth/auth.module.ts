import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTExpiresIn } from './types/auth-jwtPayload';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret = configService.getOrThrow<string>('JWT_SECRET');

        const expiresIn: JWTExpiresIn =
          configService.getOrThrow<JWTExpiresIn>('JWT_EXPIRES_IN');

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    JwtStrategy,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
