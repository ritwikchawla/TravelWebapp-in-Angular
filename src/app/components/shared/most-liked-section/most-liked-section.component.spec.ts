import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikedSectionComponent } from './most-liked-section.component';

describe('MostLikedSectionComponent', () => {
  let component: MostLikedSectionComponent;
  let fixture: ComponentFixture<MostLikedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostLikedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostLikedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
