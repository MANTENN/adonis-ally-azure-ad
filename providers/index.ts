import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    // Azure Active Directory Authentication
    const Ally = this.app.container.resolveBinding('Adonis/Addons/Ally')
    const { AzureActiveDirectory } = await import('../src/AzureActiveDirectoryProvider')

    Ally.extend('AzureAD', (_, __, config, ctx) => {
      return new AzureActiveDirectory(ctx, config)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
