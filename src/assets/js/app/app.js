export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia Skeleton';
    config.map(
      [
        { route: ['', 'home'], name: 'home', moduleId: '../../../pages/home/home', nav: false, title: 'HomePage' }
      , { route: ['about'], name: 'about', moduleId: '../../../pages/about/about', nav: true, title: 'about us' }
      , { route: ['service'], name: 'service',moduleId: '../../../pages/service/service',nav: true, title: 'Our Service' }
      , { route: ['information'], name: 'information',moduleId: '../../../pages/information/information',nav: true, title: 'information' }
      ]
    );

    this.router = router;
  }
}
