import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PeopleDataProvider } from '../../providers/people-data/people-data';

@IonicPage()
@Component({
  selector: 'page-people-list',
  templateUrl: 'people-list.html',
})
export class PeopleListPage {

  data: any;
  people: any; // change this to Person[] = []
  page = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public peopleData: PeopleDataProvider) {
      this.getPeople();
  }

  ionViewDidLoad() {

  }

  getPeople() {
    this.peopleData.getPeople(this.page).then(data => {
      this.people = data;
    });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.peopleData.getPeople(this.page).then(data => {
        this.data = data;
        for (let i=0; i<this.data.length; i++) {
          this.people.push(this.data[i]);
        }
      }, error => console.log(error));

      infiniteScroll.complete();
    }, 500);
  }
}
