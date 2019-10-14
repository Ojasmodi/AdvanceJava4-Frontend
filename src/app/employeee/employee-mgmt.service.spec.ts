import { TestBed } from '@angular/core/testing';

import { EmployeeMgmtService } from './employee-mgmt.service';

describe('EmployeeMgmtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeMgmtService = TestBed.get(EmployeeMgmtService);
    expect(service).toBeTruthy();
  });
});
