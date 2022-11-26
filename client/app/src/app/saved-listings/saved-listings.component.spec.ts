import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedListingsPageComponent } from './saved-listings.component';

describe('SavedListingsComponent', () => {
  let component: SavedListingsPageComponent;
  let fixture: ComponentFixture<SavedListingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedListingsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedListingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
