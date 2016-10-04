export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia Skeleton';
    config.map(
      [ { route: ['', 'home'], name: 'home', moduleId: '../../../pages/home/aw-home', nav: false, title: 'HomePage' }
      , { route: ['about'], name: 'about', moduleId: '../../../pages/about/aw-about', nav: true, title: 'about us' }
      , { route: ['service'], name: 'service',moduleId: '../../../pages/service/aw-service',nav: true, title: 'Our Service' }
      , { route: ['information'], name: 'information',moduleId: '../../../pages/information/aw-information',nav: true, title: 'information' }
      ]
    );

    this.router = router;
  }
}
