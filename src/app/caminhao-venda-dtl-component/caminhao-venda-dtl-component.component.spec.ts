import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhaoVendaDtlComponentComponent } from './caminhao-venda-dtl-component.component';

describe('CaminhaoVendaDtlComponentComponent', () => {
  let component: CaminhaoVendaDtlComponentComponent;
  let fixture: ComponentFixture<CaminhaoVendaDtlComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaminhaoVendaDtlComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaminhaoVendaDtlComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
