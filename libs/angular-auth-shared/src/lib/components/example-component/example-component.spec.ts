import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularAuthShared } from './example-component';

describe('AngularAuthShared', () => {
  let component: AngularAuthShared;
  let fixture: ComponentFixture<AngularAuthShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularAuthShared],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularAuthShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
