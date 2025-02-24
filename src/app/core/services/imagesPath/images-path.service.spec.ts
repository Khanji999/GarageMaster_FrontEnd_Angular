import { TestBed } from '@angular/core/testing';

import { ImagesPathService } from './images-path.service';

describe('ImagesPathService', () => {
  let service: ImagesPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
