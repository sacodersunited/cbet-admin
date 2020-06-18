
import { MsalAuthProvider, LoginType } from "react-aad-msal"
import "regenerator-runtime"

const tenant = "cbettenant.onmicrosoft.com"
const signInPolicy = "B2C_1_CbetAdminSignUpv1"
const applicationID = process.env.CBET_AZURE_APPID
const reactRedirectUri = "https://epic-beaver-ac3d99.netlify.app/"
const tenantSubdomain = tenant.split(".")[0]

const instance = `https://${tenantSubdomain}.b2clogin.com/tfp/`
const signInAuthority = `${instance}${tenant}/${signInPolicy}`

// Msal Configurations
const signInConfig = {
  auth: {
    authority: signInAuthority,
    clientId: applicationID,
    redirectUri: reactRedirectUri,
    validateAuthority: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
}

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    'https://graph.microsoft.com/Directory.Read.All',
    'https://cbettenant.onmicrosoft.com/api-1/user_impersonation',
  ],
}

const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: "https://epic-beaver-ac3d99.netlify.app/",
}

export const signInAuthProvider = new MsalAuthProvider(
  signInConfig,
  authenticationParameters,
  options
)
