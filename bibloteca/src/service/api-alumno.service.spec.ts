import { TestBed } from '@angular/core/testing';

import { ApiAlumnoService } from './api-alumno.service';

describe('ApiAlumnoService', () => {
  let service: ApiAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
