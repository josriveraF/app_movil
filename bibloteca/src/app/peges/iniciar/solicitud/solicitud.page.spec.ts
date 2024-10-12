import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPage } from './solicitud.page';

describe('SolicitudPage', () => {
  let component: SolicitudPage;
  let fixture: ComponentFixture<SolicitudPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
