import { customElement, useView, inject } from 'aurelia-framework'
import { HttpClient } from 'aurelia-http-client'
import { getCollectionTask } from './model'

@customElement('collection')
@useView('./view.html')
@inject(HttpClient)
export class Collection {
  constructor( http ) {
    this.disposables = new Set()
    this._collection = []
    this.state = {}
    this.http = http
    this.style = 'style'
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
      const onError = error =>
        log('ERROR')(error)

      const onSuccess = data =>{
        this._collection = data
        console.log( this._collection)
      }

      getCollectionTask(this.http).fork(onError, onSuccess)
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