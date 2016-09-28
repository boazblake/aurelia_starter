export class App {
  configureRouter(config, router) {
    config.title = 'JOSH WEBSITE';
    config.map([
      { route: ['', 'home'], name: 'home',      
      moduleId: './home',      nav: true, title: 'HomePage' },
    ]);

    this.router = router;
  }
}
