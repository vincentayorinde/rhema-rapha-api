import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  google: {
    callbackURL: 'http://localhost:3000/api/auth/google-redirect',
    scope: ['email', 'profile'],
    clientID:
      '675804584118-h0ugpg9f35ik4ad0eb9bca0ikv4b5m00.apps.googleusercontent.com',
    clientSecret: 'odzFpoNkvhUSSAPKeH9XdjC3',
    project_id: 'rhema-rapha',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  },
  secret: 'secret-key2',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  javascript_origins: [
    'http://localhost:3000',
    'https://rhema-rapha.firebaseapp.com',
  ],
};

export const emailSettings = {
  primaryDomain: process.env.PRIMARY_DOMAIN,
  primaryPort: process.env.PRIMARY_PORT,
  secondaryPort: process.env.SECONDARY_PORT,
  usernamePassword: process.env.PASSWORD,
  fromEmail: process.env.FROM_EMAIL,
};

export const SECRET = 'secret-key2';
export const EXPIRESIN = '7d';

export const client_id =
  '675804584118-h0ugpg9f35ik4ad0eb9bca0ikv4b5m00.apps.googleusercontent.com';

export const project_id = 'rhema-rapha';

export const auth_uri = 'https://accounts.google.com/o/oauth2/auth';

export const token_uri = 'https://oauth2.googleapis.com/token';

export const auth_provider_x509_cert_url =
  'https://www.googleapis.com/oauth2/v1/certs';

export const client_secret = 'odzFpoNkvhUSSAPKeH9XdjC3';

export const redirect_uris = [
  'https://rhema-rapha.firebaseapp.com/__/auth/handler',
];
