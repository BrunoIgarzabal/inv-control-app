import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTY5NzkzNDIsInN1YiI6ImJydW5vaWdhckBsaXZlLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.wwGk6_4wA--kS4mAo_pHS4xtSWCpgNdSB_-A_TZgpaY';

describe(UserService.name, () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${UserService.prototype.getUser.name} should return user when called with token`, () => {
    service.setToken(token);
    expect(service.getUserName()).toBe('brunoigar@live.com');

    service.getUser().subscribe(user => {
      expect(user.sub).toBe('brunoigar@live.com');
    })
  });

  it(`#${UserService.prototype.logout.name} should remove user infos when called`, () => {
    service.setToken(token);
    service.logout();

    expect(service.isLogged()).toBeFalse();
    expect(service.getUserName()).toBeFalsy();
  })

});
