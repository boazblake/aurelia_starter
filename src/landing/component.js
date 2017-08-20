import { customElement, useView, inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { HttpClient, json } from 'aurelia-http-client'
import { checkAuth } from 'authConfig'
import { userModel, registerTask, loginTask } from './model'
import { map } from 'ramda'

@customElement('landing')
@useView('./view.html')
@inject(HttpClient, EventAggregator)
export class Landing {
  constructor(http, emitter) {
    this.disposables = new Set()
    this._user = {}
    this.state = {}
    this.http = http
    this.emitter = emitter
    this.style = 'style'
  }

  login() {
    this.user = userModel(this._user)

    const onError = error =>
      console.log('ERROR', error)

    const onSucces = data => {
      localStorage.setItem('userId', JSON.stringify(data.userId))
      if ( checkAuth() ) this.emitter.publish('auth', true)
    }


    loginTask(this.http)(this.user).fork(onError, onSucces)
  }

  register() {
    this.user = userModel(this._user)

    const onError = error =>
      console.log('ERROR', error)

    const onSucces = data => {
      localStorage.setItem('userId', JSON.stringify(data.userId))
      console.log('SUCESS', data)
    }

    console.log(this.user)

    registerTask(this.http)(this.user).fork(onError, onSucces)
  }

}
