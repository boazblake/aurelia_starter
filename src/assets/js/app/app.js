export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia Skeleton';
    config.map(
      [ { route: ['', 'home'], name: 'home', moduleId: '../../../pages/home/aw-home', nav: false, title: 'HomePage' }
      , { route: ['about'], name: 'about', moduleId: '../../../pages/about/aw-about', href:'#about', nav: true, title: 'about us' }
      , { route: ['services'], name: 'services',moduleId: '../../../pages/service/aw-service', href:'#services', nav: true, title: 'Our Service' }
      , { route: ['information'], name: 'information',moduleId: '../../../pages/information/aw-information', href:'#information',nav: true, title: 'information' }
      ]
    );

    this.router = router;
  }
}
