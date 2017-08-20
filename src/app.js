
const routes =
  [ { route: ['home']
    , name: 'home'
    , moduleId: 'home/component'
    , nav: false
    , title:'home'
    }
  , { route: ['']
    , nav: false
    , redirect: 'home'
    }
  ]

export class App {
  constructor() {
    this.style = 'style'
  }

  configureRouter(config, router) {
    config.title = 'Home'

    // config.pushState = true

    config.map(routes)

    config.mapUnknownRoutes(() => 'home/component')

    this.router = router
  }
}
