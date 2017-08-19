import { useView, inject } from 'aurelia-framework'
import { HttpClient } from 'aurelia-http-client'
import { checkAuth } from 'authConfig'
import { EventAggregator } from 'aurelia-event-aggregator'
import { log } from 'utilities'

@useView('./nav-bar.html')
@inject(HttpClient, EventAggregator)
export class NavBar {
  constructor(http, emitter) {
    this.emitter = emitter
    this.authStatus = false
    this.http = http
  }

  attached() {
    const handler = authStatus =>{
      this.authStatus = authStatus
      log('authStatus')(authStatus)
    }

    this.emitter.subscribe('auth', handler )
  }



  logout($event){
    Promise.resolve(this.http.get("http://localhost:8080/auth/logout")).then(() => {
      localStorage.removeItem('userId')
      if( !checkAuth() ) this.emitter.publish('auth', false )
    })
  }
}
