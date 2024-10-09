import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarPage } from './iniciar.page';

describe('IniciarPage', () => {
  let component: IniciarPage;
  let fixture: ComponentFixture<IniciarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
