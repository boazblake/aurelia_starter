export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia Starter';
    config.map(
      [ 
        { route: ['', 'home']
        , name: 'home'
        , moduleId: '../../../pages/home/aw-home'
        , nav: false
        , title: 'HomePage'
        }
      ]
    );

    this.router = router;
  }
}
