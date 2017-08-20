import { customElement, useView, inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { HttpClient } from 'aurelia-http-client'
import { getItemTask } from './model'
import { log } from 'utilities'

@customElement('item.edit')
@useView('./view.html')
@inject(HttpClient, EventAggregator)
export class Item {
  constructor(http, emitter) {
    this.disposables = new Set()
    this.data = {}
    this.state = {}
    this.http = http
    this.emitter = emitter
  }

  canActivate(params, routeConfig, navigationInstruction) {

  }

  activate(params, routeConfig, navigationInstruction) {
    this.id = params.id
  }

  created(owningView, myView) {

  }

  bind(bindingContext,overrideContext) {

  }

  attached() {
    const onError = E => log('ERROR')(E)
    const onSuccess = data =>
      log('data')(data)

    getItemTask(this.http)(this.id).fork(onError, onSuccess)
  }

  canDeactivate() {

  }

  deactivate() {

  }

  detached() {

  }

  unbind() {

  }
}
