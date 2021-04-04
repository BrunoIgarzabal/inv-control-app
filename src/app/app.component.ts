import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { APIInfo } from './core/api/api';
import { ApiService } from './core/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },

    { title: 'Vendas', url: '/clients', icon: 'cart' },
    { title: 'Ordem de serviços', url: '/providers', icon: 'build' },

    { title: 'Marcas', url: '/brands', icon: 'bookmarks' },
    { title: 'Produtos', url: '/providers', icon: 'cube' },
    { title: 'Categorias', url: '/providers', icon: 'grid' },

    { title: 'Cadastros', url: '/clients', icon: 'add' },

    { title: 'Financeiro', url: '/clients', icon: 'cash' },
    { title: 'Relatórios', url: '/reports', icon: 'cellular' },
  ];

  public othersPage = [
    { title: 'Usuários', url: '/users', icon: 'people' },
    { title: 'Configurações', url: '/settings', icon: 'construct' },
  ]

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private apiService: ApiService
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#4C71DE');

      const loader = await this.loaderUi();
      /* loader.present();

      this.apiService.getAPIInfo().subscribe(async res => {
        
        const apiStatus = res['app'] as APIInfo;
        console.log(apiStatus);
        await loader.dismiss();

      }, async err => {
        console.error(err);
        const errorModal = await this.errorAlert();
        errorModal.present();
        
        await loader.dismiss();

      }) */
    })
    
  }

  async loaderUi() {
    return this.loadingController.create({
      message: 'Sincronizando dados...',
      animated: true,
      spinner: 'circles',
      backdropDismiss: false,
      showBackdrop: true,
      keyboardClose: true,

    });
  }

  async errorAlert() {
    return this.alertController.create({
      header: 'Temos Problemas',
      message: 'Serviço indisponível. Por favor tente novamente mais tarde.',
      backdropDismiss: false,
    });
  }
}
