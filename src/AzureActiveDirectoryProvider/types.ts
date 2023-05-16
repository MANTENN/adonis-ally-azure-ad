// extended-ally.d.ts
import { Oauth2AccessToken, Oauth2ClientConfig } from '@poppinss/oauth-client'

declare module '@ioc:Adonis/Addons/Ally' {
  /**
   * Define the access token object properties in this type. It
   * must have "token" and "type" and you are free to add
   * more properties.
   *
   * ------------------------------------------------
   * Azure Active Directory Token
   * ------------------------------------------------
   */
  export type AzureActiveDirectoryToken = Oauth2AccessToken & {
    token: string
    type: string
    token_type: string
    scope: string
    expires_in: number
    ext_expires_in: number
    access_token: string
    /**
     * An OAuth 2.0 refresh token. The app can use this token to acquire other access tokens after the current access token expires. Refresh tokens are long-lived. They can maintain access to resources for extended periods. For more detail on refreshing an access token, refer to Refresh the access token later in this article.
     * Note: Only provided if offline_access scope was requested.
     *
     * ------------------------------------------------
     * https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
     * ------------------------------------------------
     **/
    refresh_token: string
    id_token: string
  }

  /**
   * Define a union of scopes your driver accepts. Here's an example of same
   * https://github.com/adonisjs/ally/blob/develop/adonis-typings/ally.ts#L236-L268
   *
   * ------------------------------------------------
   * Azure Active Directory Scopes
   * ------------------------------------------------
   */
  export type AzureActiveDirectoryScopes = string

  /**
   * Define the configuration options accepted by your driver. It must have the following
   * properties and you are free add more.
   *
   * ------------------------------------------------
   * Azure Active Directory Driver Config
   * ------------------------------------------------
   */
  export type AzureActiveDirectoryDriverConfig = Oauth2ClientConfig & {
    driver: 'AzureAD'
    tenantId?: string
    clientId: string
    clientSecret: string
    callbackUrl: string
    authorizeUrl?: string
    accessTokenUrl?: string
    userInfoUrl?: string
    scopes?: LiteralStringUnion<AzureActiveDirectoryScopes>[]
  }

  export interface AzureActiveDirectoryContract
    extends AllyDriverContract<AzureActiveDirectoryToken, AzureActiveDirectoryScopes> {
    version: 'oauth2'
  }

  export type UserInfo = {
    '@odata.context': string
    '@odata.id': string
    'businessPhones': string[]
    'displayName': string
    'givenName': string
    'jobTitle': string
    'mail': string
    'mobilePhone': string
    'officeLocation': string
    'preferredLanguage'?: any
    'surname': string
    'userPrincipalName': string
    'id': string
  }

  export type UserFields = Partial<AllyUserContract<AzureActiveDirectoryToken>> & {
    id: string
    nickName: string
    name: string
    email: string | null
    emailVerificationState: 'verified' | 'unverified' | 'unsupported'
    avatarUrl: string | null
    displayName?: string | undefined
    original: UserInfo | null
  }

  export type UserFieldsAndToken = AllyUserContract<{
    token: string
    type: 'bearer'
  }>
}
