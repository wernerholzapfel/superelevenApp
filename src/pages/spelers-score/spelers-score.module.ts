import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpelersScorePage } from './spelers-score';

@NgModule({
  declarations: [
    SpelersScorePage,
  ],
  imports: [
    IonicPageModule.forChild(SpelersScorePage),
  ],
  exports: [
    SpelersScorePage
  ]
})
export class SpelersScorePageModule {}
