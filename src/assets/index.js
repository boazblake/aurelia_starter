const resources =
  [ './images/img-not-found.png' 
  , './images/navbar-logo.svg'
  ]

  export function configure(aurelia) {
    aurelia.globalResources(resources)
  }