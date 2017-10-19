import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoesComponentComponent } from './caminhoes-component.component';

describe('CaminhoesComponentComponent', () => {
  let component: CaminhoesComponentComponent;
  let fixture: ComponentFixture<CaminhoesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaminhoesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaminhoesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
