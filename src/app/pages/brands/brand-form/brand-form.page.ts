import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { CreateBrand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.page.html',
  styleUrls: ['./brand-form.page.scss'],
})
export class BrandFormPage implements OnInit {

  @Input() id: string;

  brandForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private brandService: BrandService
  ) { }

  ngOnInit() {
    this.brandForm = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.maxLength(50) ]],
    });
  }

  async save() {
    if (this.brandForm.valid) {
      const name = this.brandForm.get('userName').value;
      const newBrand: CreateBrand = { name };

      const loader = await this.presentLoading();
      loader.present();

      this.brandService.insert(newBrand).subscribe(async res => {
        loader.dismiss();
      })

    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Salvando dados...',
      backdropDismiss: false,
    });
    return loading;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
