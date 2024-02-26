import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './authinterceptor.service';

describe('Authinterceptor.Service.TsService', () => {
  let service: AuthInterceptor ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
