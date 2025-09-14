// Demo OAuth Provider for testing
// This simulates a working OAuth provider

export const DemoProvider = {
  id: "demo",
  name: "Demo",
  type: "oauth",
  version: "2.0",
  scope: "openid email profile",
  params: {
    grant_type: "authorization_code",
  },
  accessTokenUrl: "https://demo.oauth.com/oauth/token",
  requestTokenUrl: "https://demo.oauth.com/oauth/request",
  authorizationUrl: "https://demo.oauth.com/oauth/authorize?response_type=code",
  profileUrl: "https://demo.oauth.com/oauth/userinfo",
  profile(profile) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    }
  },
  clientId: "demo-client-id",
  clientSecret: "demo-client-secret",
}
