import { TestBed } from '@angular/core/testing';

import { TitanicService } from './titanic.service';

describe('TitanicService', () => {
  let service: TitanicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitanicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
