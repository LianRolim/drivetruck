import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVagaComponentComponent } from './cadastro-vaga-component.component';

describe('CadastroVagaComponentComponent', () => {
  let component: CadastroVagaComponentComponent;
  let fixture: ComponentFixture<CadastroVagaComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroVagaComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVagaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
