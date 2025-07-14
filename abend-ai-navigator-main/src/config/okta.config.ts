import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';

export const oktaConfig: OktaAuthOptions = {
  clientId: "0oasg60pytc4rGJZ0697",
  issuer: "https://trial-8955355.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  responseType: ["code"],
};

// Create Okta Auth instance
export const oktaAuth = new OktaAuth(oktaConfig);

export default oktaConfig; 