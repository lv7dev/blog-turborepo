export type JWTExpiresIn = '1h' | '7d' | '30m' | '3600s' | '24h';

export type AuthJwtPayload = {
  sub: number;
};
