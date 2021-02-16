import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceLimitPageRoutingModule } from './price-limit-routing.module';

import { PriceLimitPage } from './price-limit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceLimitPageRoutingModule
  ],
  declarations: [PriceLimitPage]
})
export class PriceLimitPageModule {}
