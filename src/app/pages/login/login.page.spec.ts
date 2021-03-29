import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginPageModule } from './login.module';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe(LoginPage.name, () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display disabled button when form is invalid`, () => {
    fixture.detectChanges();
    
    component.loginForm.get('userName').setValue('');
    component.loginForm.get('password').setValue('');
    
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('ion-button');

    expect(buttonEl.disabled).toBeTrue();
    
  })

  it(`(D) Should display activated button when form is valid`, () => {
    fixture.detectChanges();
    
    component.loginForm.get('userName').setValue('someUsername');
    component.loginForm.get('password').setValue('somePassword');
    
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('ion-button');

    expect(buttonEl.disabled).toBeFalsy();
    
  });

  it(`#${LoginPage.prototype.login.name} should authenticate user when button is pressed with form valid`, fakeAsync(async () => {
    fixture.detectChanges();

    spyOn(component, 'login');
    spyOn(service, 'authenticate')
      .and.returnValue(of());

    let mock = spyOn(router, 'navigate');
    
    component.loginForm.get('userName').setValue('someUsername');
    component.loginForm.get('password').setValue('somePassword');
    
    fixture.detectChanges();

    await component.login();

    expect(component.login).toHaveBeenCalled();

  }));

  
});
