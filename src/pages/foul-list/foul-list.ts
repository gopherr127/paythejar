import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FoulDataProvider } from '../../providers/foul-data/foul-data';

@IonicPage()
@Component({
  selector: 'page-foul-list',
  templateUrl: 'foul-list.html',
})
export class FoulListPage {

  data: any;
  fouls: any;
  page = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public foulData: FoulDataProvider) {
      this.getFouls();
  }

  ionViewDidLoad() {
    
  }

  getFouls() {
    this.foulData.getFouls(this.page).then(data => {
      this.fouls = data;
    });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.foulData.getFouls(this.page).then(data => {
        this.data = data;
        for (let i=0; i<this.data.length; i++) {
          this.fouls.push(this.data[i]);
        }
      }, error => console.log(error));

      infiniteScroll.complete();
    }, 500);
  }
}
