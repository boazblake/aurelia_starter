export class AwHome {
  constructor(){
    this.counts = 1
  }

  clicked() {
    this.counts ++
    console.log(this.counts);
  }
}