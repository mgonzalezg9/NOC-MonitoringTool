import 'dotenv/config';
import * as env from 'env-var';

export const PORT: number = env.get('PORT').default(3000).asPortNumber();
export const MAILER_SERVICE: string = env.get('MAILER_SERVICE').required().asString();
export const MAILER_EMAIL: string = env.get('MAILER_EMAIL').required().asEmailString();
export const MAILER_SECRET_KEY: string = env.get('MAILER_SECRET_KEY').required().asString();
export const PROD: boolean = env.get('PROD').required().asBool();
