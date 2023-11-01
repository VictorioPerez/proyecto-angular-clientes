import { TestBed } from '@angular/core/testing';

import { TurneroService } from './turnero.service';

describe('TurneroService', () => {
  let service: TurneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
