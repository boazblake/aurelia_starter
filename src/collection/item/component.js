import { customElement, useView, inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { HttpClient } from 'aurelia-http-client'
import { getCollectionTask } from './model'

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

  }

  created(owningView, myView) {

  }

  bind(bindingContext,overrideContext) {

  }

  attached() {
  //fetch item
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
