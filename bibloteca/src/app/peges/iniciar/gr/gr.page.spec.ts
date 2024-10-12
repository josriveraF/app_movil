import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrPage } from './gr.page';

describe('GrPage', () => {
  let component: GrPage;
  let fixture: ComponentFixture<GrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
