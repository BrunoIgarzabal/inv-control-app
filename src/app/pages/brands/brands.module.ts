import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsListPage } from './brands-list/brands-list.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrandsPageRoutingModule } from './brands-routing.module';

@NgModule({
  declarations: [BrandsListPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandsPageRoutingModule
  ],
  exports: [BrandsListPage]
})
export class BrandsModule { }
