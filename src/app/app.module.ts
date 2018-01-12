import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { JarListPage } from '../pages/jar-list/jar-list';
import { PeopleListPage } from '../pages/people-list/people-list';
import { FoulListPage } from '../pages/foul-list/foul-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JarDataProvider } from '../providers/jar-data/jar-data';
import { PeopleDataProvider } from '../providers/people-data/people-data';
import { FoulDataProvider } from '../providers/foul-data/foul-data';
import { MessageService } from '../providers/message-service/message-service';

import { ENV } from '@app/env';
console.log(ENV.mode);

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    JarListPage,
    PeopleListPage,
    FoulListPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    JarListPage,
    PeopleListPage,
    FoulListPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JarDataProvider,
    PeopleDataProvider,
    FoulDataProvider,
    MessageService
  ]
})
export class AppModule {}
