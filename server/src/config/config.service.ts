import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

interface JwtConfig {
  secret: string;
  signOptions: {
    expireIn: string;
  };
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
  public getJwtConfig(isGenerate: boolean): JwtConfig {
    if (isGenerate) {
      return {
        secret: this.getValue('JWT_GENERATE_KEY'),
        signOptions: {
          expireIn:
            `${this.getValue('JWT_GENERATE_KEY_EXPIRE', false)}` || '1d',
        },
      };
    } else {
      return {
        secret: this.getValue('JWT_REFRESH_KEY'),
        signOptions: {
          expireIn:
            `${this.getValue('JWT_REFRESH_KEY_EXPIRE', false)}` || '15d',
        },
      };
    }
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
}

const configService = new ConfigService(process.env);

export { configService };
