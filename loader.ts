import * as dotenv from 'dotenv';
import { dotEnvOptions } from './src/config/dotenv-options';

dotenv.config(dotEnvOptions);

import * as dbConfig from './src/config/database.config';

module.exports = dbConfig.default;
