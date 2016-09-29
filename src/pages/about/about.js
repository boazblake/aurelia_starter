import 'bootstrap';
import { inject } from 'aurelia-framework';
import { imgSrc } from '../../assets/images/navbar-logo.svg'

export class About {
  constructor(imgSrc){
  imgSrc = imgSrc;
  }
  
  title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.';
  subTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus et ligula venenatis, at rhoncus nisi molestie. Pellentesque porttitor elit suscipit massa laoreet metus.';
}