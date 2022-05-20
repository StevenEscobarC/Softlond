export default {
    //OpenID connect
    oidc: {
        // public identifier of client app
        clientId: '0oa53zdxy9Z3HcRaE5d7',
        //URL when authorizing with Okta Authorization Server
        issuer: 'https://dev-50480029.okta.com/oauth2/default',
        //Once user logs in send them here
        redirectUri: 'https://localhost:4200/login/callback',
        //provee informacion sobre un usuario
        scopes: ['openid', 'profile', 'email']
    }
}
