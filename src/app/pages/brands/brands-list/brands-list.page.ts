import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { StatusError, ValidationError } from 'src/app/core/errors/error';
import { CreateBrand } from '../brand';
import { BrandFormPage } from '../brand-form/brand-form.page';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.page.html',
  styleUrls: ['./brands-list.page.scss'],
})
export class BrandsListPage implements OnInit {

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private brandService: BrandService
  ) { }

  ngOnInit() {
  }

  async openBrandFormModal(name: string = '') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nova Marca',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome da marca',
          value: name,
          attributes: {
            required: true,
            maxLength: 50
          }
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Cadastrar',
          role: 'ok',
          handler: async (data) => {
            await this.save(data.name);
          }
        }
      ]
    });

    await alert.present();
  }

  async save(name: string) {
      const newBrand: CreateBrand = { name };

      const loader = await this.presentLoading();
      loader.present();

      this.brandService.insert(newBrand).subscribe(async res => {
        
        const toast = await this.successToast('Marca cadastrada com sucesso');
        loader.dismiss();
        toast.present();
        
      }, async err => {
        console.error(err);
        loader.dismiss();
        await this.openBrandFormModal(name);

        let errorMessage;

        if (err.error.status == 422) {
          const error = err.error as ValidationError;
          console.log(error.errors);
          errorMessage = error.errors[0].message;

        } else {
          errorMessage = StatusError(err.error.status);
        }

        const toast = await this.errorToast(errorMessage ?? 'Tente novamente mais tarde');
        toast.present();

      })

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Salvando dados...',
      backdropDismiss: false,
    });
    return loading;
  }

  async successToast(message: string) {
    return this.toastController.create({
      message: `<strong>${message}</strong>`,
      header: 'Sucesso',
      duration: 3400,
      position: 'bottom',
      animated: true,
      color: 'success',
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'Ok'
        }
      ]
    });
  }

  async errorToast(message: string) {
    return this.toastController.create({
      message: `<strong>${message}</strong>`,
      header: 'Erro ao cadastrar marca',
      duration: 3400,
      position: 'bottom',
      animated: true,
      color: 'danger',
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'Ok'
        }
      ]
    });
  }


  /* async aaa(id?: number) {
    const modal = await this.modalController.create({
      component: BrandFormPage,
      componentProps: {
        'id': id,
      }
    });
    return await modal.present();
  } */

}
