import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import IEnvConfigInterface from './ienvconfig';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfigInterface;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    if (process.env.NODE_ENV === 'development') {
      this.envConfig = this.validateInput(config);
    }
  }

  public getTypeORMConfig(): any {
    const baseDir = path.join(__dirname, '../');
    const entitiesPath = `${baseDir}${this.envConfig.TYPEORM_ENTITIES}`;
    const migrationPath = `${baseDir}${this.envConfig.TYPEORM_MIGRATIONS}`;
    // const type: any = this.envConfig.TYPEORM_CONNECTION;
    return {
      DATABASE_URL: this.envConfig.TYPEORM_DATABASE,
      entities: [entitiesPath],

      migrations: [migrationPath],
      migrationsRun: this.envConfig.TYPEORM_MIGRATIONS_RUN === 'true',

      cli: {
        migrationsDir: 'src/db/migrations',

        entitiesDir: 'src/db/entities',
      },
    };

    // return {
    //   type,

    //   host: this.envConfig.TYPEORM_HOST,

    //   username: this.envConfig.TYPEORM_USERNAME,

    //   password: this.envConfig.TYPEORM_PASSWORD,

    //   database: this.envConfig.TYPEORM_DATABASE,

    //   port: Number.parseInt(this.envConfig.TYPEORM_PORT, 10),

    //   logging: false,

    //   entities: [entitiesPath],

    //   migrations: [migrationPath],
    //   migrationsRun: this.envConfig.TYPEORM_MIGRATIONS_RUN === 'true',

    //   cli: {
    //     migrationsDir: 'src/db/migrations',

    //     entitiesDir: 'src/db/entities',
    //   },
    // };
  }

  private validateInput(envConfig: IEnvConfigInterface): any {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test')
        .default('development'),
      HTTP_PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      return new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
