import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonComponent } from '../../../../src/app/modules/person/pages/list-person/list-person.component';

describe('ListPersonComponent', () => {
  let component: ListPersonComponent;
  let fixture: ComponentFixture<ListPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPersonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
