import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedListingsComponent } from './saved-listings.component';

describe('SavedListingsComponent', () => {
  let component: SavedListingsComponent;
  let fixture: ComponentFixture<SavedListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedListingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
