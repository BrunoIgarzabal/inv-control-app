import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsListPage } from './brands-list/brands-list.page';

const routes: Routes = [
  {
    path: '',
    component: BrandsListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsPageRoutingModule {}
