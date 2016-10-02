const resources =
  [ './about/aw-about'
  , './contact/aw-contact'
  , './home/aw-home'
  , './information/aw-information'
  , './service/aw-service'
  , './splash/aw-splash'
  ]

  export function configure(aurelia) {
    aurelia.globalResources(resources)
  }