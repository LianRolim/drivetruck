import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarComponentComponent } from './recuperar-component.component';

describe('RecuperarComponentComponent', () => {
  let component: RecuperarComponentComponent;
  let fixture: ComponentFixture<RecuperarComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
