import { Component, OnDestroy } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { TabsPage } from '../tabs/tabs';
import { MessageService } from '../../providers/message-service/message-service';
import { JarDataProvider } from '../../providers/jar-data/jar-data';
import { Jar } from '../../app/jar/jar';
import { Person } from '../../app/person/person';
import { Foul } from '../../app/foul/foul';

@IonicPage()
@Component({
  selector: 'page-jar-list',
  templateUrl: 'jar-list.html',
})
export class JarListPage implements OnDestroy {
  data: any;
  jars: any;
  page = 0;
  selectedJar: Jar;
  selectedPerson: Person;
  personSelectedSubscription: Subscription;
  selectedFoul: Foul;
  foulSelectedSubscription: Subscription;

  constructor(
    public app: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public messageService: MessageService,
    public jarData: JarDataProvider) {

      this.getJars();

      // Get currently selected person and foul, if exist...
      this.selectedPerson = this.messageService.currentlySelectedPerson;
      this.selectedFoul = this.messageService.currentlySelectedFoul;
      // ...and subscribe to future updates
      this.personSelectedSubscription = this.messageService.getPersonSelectedMessage()
        .subscribe(message => {
          this.selectedPerson = message;
        });
      this.foulSelectedSubscription = this.messageService.getFoulSelectedMessage()
        .subscribe(message => {
          this.selectedFoul = message;
        });
  }

  ionViewDidLoad() {
  }

  getJars() {
    this.jarData.getJars(this.page).then(data => {
      this.jars = data;
    });
  }

  onJarItemClicked(jar) {
    this.selectedJar = jar;
    this.messageService.sendJarSelectedMessage(jar);
    // Auto-navigate to the next appropriate page
    if (!this.selectedPerson) {
      this.app.getRootNav().setRoot(TabsPage, { tabIndex: 2 });

    } else if (!this.selectedFoul) {
      this.app.getRootNav().setRoot(TabsPage, { tabIndex: 3 });
    }
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
    }, 500);
  }
  
  ngOnDestroy() {
    this.personSelectedSubscription.unsubscribe();
    this.foulSelectedSubscription.unsubscribe();
  }
}
