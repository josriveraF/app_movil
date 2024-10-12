import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MibiblotecaPage } from './mibibloteca.page';

describe('MibiblotecaPage', () => {
  let component: MibiblotecaPage;
  let fixture: ComponentFixture<MibiblotecaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MibiblotecaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
