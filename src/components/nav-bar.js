import { useView, inject, bindable } from 'aurelia-framework'
import { HttpClient } from 'aurelia-http-client'
import { checkAuth } from 'authConfig'
import { EventAggregator } from 'aurelia-event-aggregator'
import { log } from 'utilities'

@inject(HttpClient, EventAggregator)
export class NavBar {
  @bindable router
  constructor(http, emitter) {
    this.emitter = emitter
    this.authStatus = false
    this.http = http
  }

  attached() {
    const handler = authStatus =>{
      this.authStatus = authStatus
      log('authStatus')(authStatus)
      console.log(this.router.navigation.forEach(x => console.log(x)))
    }

    this.emitter.subscribe('auth', handler )
  }



  logout(){
    Promise.resolve(this.http.get("http://localhost:8080/auth/logout")).then(() => {
      localStorage.removeItem('userId')
      if( !checkAuth() ) this.emitter.publish('auth', false )
    })
  }
}
