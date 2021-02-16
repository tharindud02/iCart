import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchItemPage } from './search-item.page';

const routes: Routes = [
  {
    path: '',
    component: SearchItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchItemPageRoutingModule {}
