import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserLogin } from '../user/user-auth';
import { UserService } from '../user/user.service';

const mockBoody = {
  api: 'http://localhost:8080/login',
  data: {
    email: 'someEmail',
    password: 'somePassword'
  }
}

describe(AuthService.name, () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  afterEach(() => httpMock.verify());

  it(`Should be created`, () => {
    expect(service).toBeTruthy(); 
  });

  it(`#${AuthService.prototype.authenticate.name} 
    should be authenticate user when called with userLogin`, done => {

    const user: UserLogin = { email: 'someEmail', password: 'somePassword'};

    const userSpy = spyOn(userService, 'setToken')
      .and.returnValue(null);

    service.authenticate(user).subscribe(res => {
      expect(res.body).toEqual(mockBoody.data);
      expect(userSpy).toHaveBeenCalledWith('someToken')
      done();
    });

    httpMock
      .expectOne(req => req.method == 'POST')
      .flush(mockBoody.data, {headers: {'Authorization': 'someToken'}});
  })

  
});
