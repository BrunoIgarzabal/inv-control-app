import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsListPage } from './brands-list/brands-list.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrandsPageRoutingModule } from './brands-routing.module';
import { BrandFormPage } from './brand-form/brand-form.page';

@NgModule({
  declarations: [BrandsListPage, BrandFormPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrandsPageRoutingModule
  ],
  exports: [BrandsListPage, BrandFormPage]
})
export class BrandsModule { }
