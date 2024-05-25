import { TestBed } from '@angular/core/testing';

import { PersonControllerService } from '../../../../src/app/modules/person/controller/person-controller.service';

describe('PersonController', () => {
  let service: PersonControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
