import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCaminhaoComponentComponent } from './cadastro-caminhao-component.component';

describe('CadastroCaminhaoComponentComponent', () => {
  let component: CadastroCaminhaoComponentComponent;
  let fixture: ComponentFixture<CadastroCaminhaoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCaminhaoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCaminhaoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
