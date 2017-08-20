import { useView, inject } from 'aurelia-framework'

const routes =
  [ { route: 'landing'
    , name: 'home.landing'
    , moduleId: 'landing/component'
    , nav: true
    , title: 'landing'
    }
  , { route: 'collection'
    , name: 'home.collection'
    , moduleId: 'collection/component'
    , nav: true
    , title: 'collection'
    }
  , { route: 'collection/item/:id/edit'
    , name: 'item.edit'
    , href: 'item.edit'
    , moduleId: 'collection/item/component'
    , nav: false
    , title: 'edit'
    }
  , { route: ['']
    , nav: false
    , redirect: 'landing'
    }
  ]

@useView('./view.html')
export class Home {
  constructor() {
    this.style = 'style'
  }

  configureRouter(config, router) {
    config.map(routes)

    config.mapUnknownRoutes(_ => 'landing/component')

    this.router = router
  }

}