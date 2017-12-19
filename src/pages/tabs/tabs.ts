import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular'; //, NavController, NavParams
import { HomePage } from '../home/home';
import { JarListPage } from '../jar-list/jar-list';
import { PeopleListPage } from '../people-list/people-list';
import { FoulListPage } from '../foul-list/foul-list';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = JarListPage;
  tab3Root = PeopleListPage;
  tab4Root = FoulListPage;

  //public navCtrl: NavController, public navParams: NavParams
  constructor() {
  }

}
