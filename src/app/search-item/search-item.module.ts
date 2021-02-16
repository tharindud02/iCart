import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchItemPageRoutingModule } from './search-item-routing.module';

import { SearchItemPage } from './search-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchItemPageRoutingModule
  ],
  declarations: [SearchItemPage]
})
export class SearchItemPageModule {}
