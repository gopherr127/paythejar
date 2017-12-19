import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JarListPage } from './jar-list';

@NgModule({
  declarations: [
    JarListPage,
  ],
  imports: [
    IonicPageModule.forChild(JarListPage),
  ],
})
export class JarListPageModule {}
