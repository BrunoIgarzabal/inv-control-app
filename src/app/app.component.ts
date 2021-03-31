import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

    { title: 'Marcas', url: '/clients', icon: 'bookmarks' },
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

  constructor(private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#4C71DE');
  }
}
