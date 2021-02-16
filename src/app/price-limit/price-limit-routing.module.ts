import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceLimitPage } from './price-limit.page';

const routes: Routes = [
  {
    path: '',
    component: PriceLimitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceLimitPageRoutingModule {}
