import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JarDataProvider } from '../../providers/jar-data/jar-data';
//import { Jar } from '../../jar/jar';

@IonicPage()
@Component({
  selector: 'page-jar-list',
  templateUrl: 'jar-list.html',
})
export class JarListPage {

  data: any;
  jars: any; // change this to Jar[] = []
  errorMessage: string;
  page = 0;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public jarData: JarDataProvider) {
      this.getJars();
  }

  ionViewDidLoad() {
    
  }

  getJars() {
    this.jarData.getJars(this.page).then(data => {
      this.jars = data;
      console.log('Data made it to jar-list.ts');
      console.log(this.jars);
    });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.jarData.getJars(this.page).then(data => {
        this.data = data;
        for (let i=0; i<this.data.length; i++) {
          this.jars.push(this.data[i]);
        }
      }, error => console.log(error));
      infiniteScroll.complete();
    }, 1000);
  }
}
