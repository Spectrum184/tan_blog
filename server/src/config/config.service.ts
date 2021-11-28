import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

interface JwtConfig {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}

interface SessionKey {
  secret: string;
  salt: string;
}

interface RedisConfig {
  host: string;
  port: number;
  ttl: number;
}

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true) {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`Error: missing process key env.${key}`);
    }

    return value;
  }

  /**
   * get mode of app
   * @return boolean
   */
  public isProduction(): boolean {
    const mode = this.getValue('NODE_ENV', false);

    return mode !== 'development';
  }

  /**
   * get config of TypeOrm for postgres
   * @return TypeOrmModuleOptions
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USERNAME'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      synchronize: true,
      entities: [join(__dirname, '../', '**', 'entity.{ts,js}')],
      autoLoadEntities: true,
    };
  }

  /**
   * get jwt config of refresh or generate token
   * @var boolean isGenerate
   * @returns JwtConfig
   */
  public getJwtConfig(): JwtConfig {
    return {
      secret: this.getValue('JWT_GENERATE_KEY'),
      signOptions: {
        expiresIn: `${
          this.getValue('JWT_GENERATE_KEY_EXPIRE', false) || '10d'
        }`,
      },
    };
  }

  /**
   * get expose app port
   * @returns int port
   */
  public getAppPort(): number {
    const port = parseInt(this.getValue('APP_PORT', false)) || 5000;

    return port;
  }

  /**
   * get client url
   * @returns string clientUrl
   */
  public getClientUrl(): string {
    const clientUrl =
      this.getValue('CLIENT_URL', false) || 'http://locahost:3000';

    return clientUrl;
  }

  /**
   * name
   */
  public getSessionKey(): SessionKey {
    const secret = this.getValue('SESSION_SECRET', false) || 'diepbungto';
    const salt = this.getValue('SESSION_SALT', false) || 'okbaby';

    return {
      secret,
      salt,
    };
  }

  /**
   * name
   */
  public getRedisConfig(): RedisConfig {
    const host = this.getValue('REDIS_HOST') || 'localhost';
    const port = this.getValue('REDIS_PORT') || 6379;
    const ttl = this.getValue('REDIS_TTL', false) || 3600;

    return {
      host,
      port: Number(port),
      ttl: Number(ttl),
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
