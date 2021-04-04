import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/core/auth/auth.service';
import { UserLogin } from 'src/app/core/user/user-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private menu: MenuController
  ) { }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const userName = this.loginForm.get('userName').value;
      const password = this.loginForm.get('password').value;

      const userLogin: UserLogin = {
        email: userName,
        password: password
      }

      const loader = await this.presentLoading();
      loader.present();

      this.authService
        .authenticate(userLogin)
        .subscribe(() => {
          loader.dismiss();
          this.router.navigate([''])
        }, async err => {
            const toast = await this.toastUi(err.error.message ?? 'Tente novamente mais tarde');
            console.error(err);

            this.loginForm.reset();
            loader.dismiss();

            toast.present();

          }
      );
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Autenticando...',
      backdropDismiss: false,
    });
    return loading;
  }

  async toastUi(message: string) {
    return this.toastController.create({
      message: `<strong>${message}</strong>`,
      header: 'Erro ao fazer login',
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


}
