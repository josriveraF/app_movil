import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RePage } from './re.page';

describe('RePage', () => {
  let component: RePage;
  let fixture: ComponentFixture<RePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
