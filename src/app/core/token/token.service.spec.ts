import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTY5NzkzNDIsInN1YiI6ImJydW5vaWdhckBsaXZlLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.wwGk6_4wA--kS4mAo_pHS4xtSWCpgNdSB_-A_TZgpaY';

describe(TokenService.name, () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${TokenService.prototype.setToken.name} should insert token in local storage when called`, () => {
    service.setToken(token);
    expect(service.getToken()).toBe(token);
  })

  it(`#${TokenService.prototype.hasToken.name} should return true when called with token`, () => {
    service.setToken(token);
    expect(service.hasToken()).toBeTrue();
  })

  it(`#${TokenService.prototype.hasToken.name} should return false when called without token`, () => {
    expect(service.hasToken()).toBeFalse();
  })

  it(`#${TokenService.prototype.removeToken.name} should remove token in local storage when called`, () => {
    service.setToken(token);
    expect(service.hasToken()).toBeTrue();
    service.removeToken()
    expect(service.hasToken()).toBeFalse();
  })

});
