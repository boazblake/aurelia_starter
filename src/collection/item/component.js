import { customElement, useView, inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { Router } from 'aurelia-router'
import { HttpClient } from 'aurelia-http-client'
import { getItemTask, editTask, deleteTask } from './model'
import { log } from 'utilities'

@customElement('item.edit')
@useView('./view.html')
@inject(HttpClient, EventAggregator, Router)
export class Item {
  constructor(http, emitter, router) {
    this.disposables = new Set()
    this.data = {}
    this.state = {}
    this.http = http
    this.emitter = emitter
    this.router = router
  }

  activate(params, routeConfig, navigationInstruction) {
    params ? this.id = params.id : this.id = null
  }

  attached() {
    const onError = E => log('ERROR')(E)
    const onSuccess = data =>
      this.item = data

    getItemTask(this.http)(this.id).fork(onError, onSuccess)
  }

  save() {
    const onError = e => log('e')(e)
    const onSuccess = data =>
      log('data')(data)

    this.id
    ? editTask(this.http)(this.id)(this.item).fork(onError, onSuccess)
    : addTask(this.http)(this.item).fork(onError, onSuccess)
  }

  delete() {
    const onError = e => log('e')(e)
    const onSuccess = data =>{
      log('data')(data)
      this.router.navigateToRoute('home.collection')
    }
    deleteTask(this.http)(this.id).fork(onError, onSuccess)
  }
}
