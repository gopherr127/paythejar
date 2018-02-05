import { Component, OnDestroy } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { TabsPage } from '../tabs/tabs';
import { MessageService } from '../../providers/message-service/message-service';
import { FoulDataProvider } from '../../providers/foul-data/foul-data';
import { Jar } from '../../app/jar/jar';
import { Person } from '../../app/person/person';
import { Foul } from '../../app/foul/foul';

@IonicPage()
@Component({
  selector: 'page-foul-list',
  templateUrl: 'foul-list.html',
})
export class FoulListPage implements OnDestroy {
  data: any;
  fouls: any;
  page = 0;
  selectedJar: Jar;
  jarSelectedSubscription: Subscription;
  selectedPerson: Person;
  personSelectedSubscription: Subscription;
  selectedFoulIndex: -1;

  constructor(
    public app: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public messageService: MessageService,
    public foulData: FoulDataProvider) {
      
      this.getFouls();

      // Get currently selected jar and person, if exist...
      this.selectedJar = this.messageService.currentlySelectedJar;
      this.selectedPerson = this.messageService.currentlySelectedPerson;
      // ...and subscribe to future updates
      this.jarSelectedSubscription = this.messageService.getJarSelectedMessage()
        .subscribe(message => {
          this.selectedJar = message;
        });
      this.personSelectedSubscription = this.messageService.getPersonSelectedMessage()
        .subscribe(message => {
          this.selectedPerson = message;
        });
  }

  ionViewDidLoad() {
  }

  getFouls() {
    this.foulData.getFouls(this.page).then(data => {
      this.fouls = data;
    });
  }
  
  onFoulItemSelected(foul, indx) {
    this.selectedFoulIndex = indx;
    this.messageService.sendFoulSelectedMessage(foul);
    // Auto-navigate to the next appropriate page
    if (!this.selectedJar) {
      this.app.getRootNavs()[0].setRoot(TabsPage, { tabIndex: 1 });
    } else if (!this.selectedPerson) {
      this.app.getRootNavs()[0].setRoot(TabsPage, { tabIndex: 2 });
    }
  }

  onSelectedJarClicked() {
    this.messageService.clearJarSelectedMessage();
    this.app.getRootNavs()[0].setRoot(TabsPage, { tabIndex: 1 });
  }

  onSelectedPersonClicked() {
    this.messageService.clearPersonSelectedMessage();
    this.app.getRootNavs()[0].setRoot(TabsPage, { tabIndex: 2 });
  }

  onClearAllClicked() {
    this.messageService.clearJarSelectedMessage();
    this.messageService.clearPersonSelectedMessage();
    this.messageService.clearFoulSelectedMessage();
    this.app.getRootNavs()[0].setRoot(TabsPage, { tabIndex: 1 });
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

  ngOnDestroy() {
    this.jarSelectedSubscription.unsubscribe();
    this.personSelectedSubscription.unsubscribe();
  }
}
