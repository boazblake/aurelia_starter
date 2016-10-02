import { inject } from 'aurelia-framework';

@inject(element)
export class Footer {
  constructor(element) {
  this.element = element;
  }

  boaz = "<BoazBlake/>"
}