import { Component, OnDestroy } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { TabsPage } from '../tabs/tabs';
import { MessageService } from '../../providers/message-service/message-service';
import { PeopleDataProvider } from '../../providers/people-data/people-data';
import { Jar } from '../../app/jar/jar';
import { Person } from '../../app/person/person';
import { Foul } from '../../app/foul/foul';

@IonicPage()
@Component({
  selector: 'page-people-list',
  templateUrl: 'people-list.html',
})
export class PeopleListPage implements OnDestroy {
  data: any;
  people: any;
  page = 0;
  selectedJar: Jar;
  jarSelectedSubscription: Subscription;
  selectedPerson: Person;
  selectedFoul: Foul;
  foulSelectedSubscription: Subscription;

  constructor(
    public app: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public messageService: MessageService,
    public peopleData: PeopleDataProvider) {

      this.getPeople();

      // Get currently selected jar and foul, if exist...
      this.selectedJar = this.messageService.currentlySelectedJar;
      this.selectedFoul = this.messageService.currentlySelectedFoul;
      // ...and subscribe to future updates
      this.jarSelectedSubscription = this.messageService.getJarSelectedMessage()
        .subscribe(message => {
          this.selectedJar = message;
        });
      this.foulSelectedSubscription = this.messageService.getFoulSelectedMessage()
        .subscribe(message => {
          this.selectedFoul = message;
        });
  }

  ionViewDidLoad() {
  }

  getPeople() {
    this.peopleData.getPeople(this.page).then(data => {
      this.people = data;
    });
  }

  onPersonItemClicked(person) {
    this.selectedPerson = person;
    this.messageService.sendPersonSelectedMessage(person);
    // Auto-navigate to the next approriate page
    if (!this.selectedJar) {
      this.app.getRootNav().setRoot(TabsPage, { tabIndex: 1 });
    } else if (!this.selectedFoul) {
      this.app.getRootNav().setRoot(TabsPage, { tabIndex: 3 });
    }
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
  
  ngOnDestroy() {
    this.jarSelectedSubscription.unsubscribe();
    this.foulSelectedSubscription.unsubscribe();
  }
}
