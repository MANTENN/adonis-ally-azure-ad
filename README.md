<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1558612869/adonis-readme_zscycu.jpg" width="600px">
</div>

<br />

<div align="center">
  <h3>AdonisJS Ally x Azure AD</h3>
  <p>
    Azure AD ally driver for AdonisJS ally.
  </p>
</div>

<br />

<div align="center">
  <h3>PKCE Auth Workflow</h3>
  <p>
    PKCE is like a  client-side CSRF token to prevent token hijack attacks.
  </p>
  <p>
    Since the code is synchronus and the context, <pre>this.ctx</pre> is asynchronus, I was not able to implement PKCE flow into the Azure Active Directory library. 
  </p>
  <p>As of know I the best route is to implement PKCE in the route handler. Ex:
  <code align="left">
    // 2. Get Profile`
    Route.get('/azure-active-directory/callback', async ({ request, ally, response }) => {
      const pkceTokenRequestSchema = schema.create({
        code: schema.string(),
        codeVerifier: schema.string(),
        redirectUri: schema.string.optional(),
      })
      const { code, codeVerifier, redirectUri } = await request.validate({
        schema: pkceTokenRequestSchema,
      })

      // need to grab token
      const azureActiveDirectory = ally.use('activedirectory')

      if (azureActiveDirectory.accessDenied()) {
        return 'Access Denied'
      }

      if (azureActiveDirectory.stateMisMatch()) {
        return 'Request expired. Try again.'
      }

      if (azureActiveDirectory.hasError()) {
        return azureActiveDirectory.getError()
      }

      // need to automate the way user works to hook into and grab the PKCE info from the driver
      const user = await azureActiveDirectory.user((request) => {
        request.field('code', code)
        request.field('code_verifier', codeVerifier)
      })
      // kinda useless because the data isn't forwarded
      if (redirectUri) response.redirect(redirectUri)
      return user
      // no need to store user unless we plan on doing notifcations
    })
  </code>
</div>

<br />

<div align="center">

[![gh-workflow-image]][gh-workflow-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url] [![synk-image]][synk-url]

</div>

<div align="center">
  <h3>
    <!--<a href="https://adonisjs.com">
      Website
    </a>
    <span> | </span>-->
    <a href="https://docs.adonisjs.com/guides/auth/social">
      Guides
    </a>
    <span> | </span>
    <!--<a href="CONTRIBUTING.md">
      Contributing
    </a>
    <span> | </span>-->
    <a href="benchmarks.md">
      Benchmarks
    </a>
  </h3>
</div>

<div align="center">
  <sub>Built with ❤︎ by <a href="https://twitter.com/AlexanderYW">Alexander Wennerstrøm</a>
</div>
  
[gh-workflow-image]: https://img.shields.io/github/workflow/status/alexanderyw/adonis-ally-azure-ad/Node.js%20CI/main?style=for-the-badge
[gh-workflow-url]: https://github.com/alexanderyw/adonis-ally-azure-ad/.github/workflows/test.yml "Github action"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/adonis-ally-azure-ad.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-ally-azure-ad "npm"

[license-image]: https://img.shields.io/npm/l/adonis-ally-azure-ad?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[synk-image]: https://img.shields.io/snyk/vulnerabilities/github/alexanderyw/adonis-ally-azure-ad?label=Synk%20Vulnerabilities&style=for-the-badge
[synk-url]: https://snyk.io/test/github/alexanderyw/adonis-ally-azure-ad?targetFile=package.json "synk"
