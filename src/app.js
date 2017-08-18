export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia Starter';
    config.map(
      [ { route: ['', 'default']
        , name: 'default'
        , moduleId: 'pages/default/view.html'
        , nav: true
        , title: 'LOGOUT'
        }
      , { route: ['home']
        , name: 'home'
        , moduleId: 'pages/home/view.html'
        , nav: false
        , title: 'HomePage'
        }
      ]
    );

    this.router = router;
  }
}
