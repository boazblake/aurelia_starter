import { customElement, useView, inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { Router } from 'aurelia-router'
import { HttpClient } from 'aurelia-http-client'
import { getItemTask, editTask, deleteTask, addTask } from './model'
import { log } from 'utilities'

@customElement('item.edit')
@useView('./view.html')
@inject(HttpClient, EventAggregator, Router)
export class Item {
  constructor(http, emitter, router) {
    this.disposables = new Set()
    this.data = {}
    this.state = {
      item: {},
      image: 'https://ak2.picdn.net/shutterstock/videos/816607/thumb/1.jpg'
    }
    this.http = http
    this.emitter = emitter
    this.router = router
  }

  activate(params, routeConfig, navigationInstruction) {
    params ? this.id = params.id : this.id = null
  }

  attached() {
    const onError = E => log('ERROR')(E)
    const onSuccess = data => {
      console.log(data)
      this.state.item = data
      this.id
      ? this.state.image = this.state.item.image
      : this.state.item.image = this.state.image
    }

    getItemTask(this.http)(this.id).fork(onError, onSuccess)
  }

  save() {
    if (this.selectedFiles) {
      createDto(this.state.item)(this.selectedFiles)
    }

    const onError = e => log('e')(e)
    const onSuccess = data =>
      log('data')(data)

    this.id
    ? editTask(this.http)(this.id)(this.state.item).fork(onError, onSuccess)
    : addTask(this.http)(this.state.item).fork(onError, onSuccess)
  }

  delete() {
    const onError = e => log('e')(e)
    const onSuccess = data =>{
      log('data')(data)
      this.router.navigateToRoute('home.collection')
    }
    deleteTask(this.http)(this.id).fork(onError, onSuccess)
  }

  image() {

  }

}
