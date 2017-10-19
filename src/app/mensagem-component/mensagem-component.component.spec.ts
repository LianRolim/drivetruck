import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemComponentComponent } from './mensagem-component.component';

describe('MensagemComponentComponent', () => {
  let component: MensagemComponentComponent;
  let fixture: ComponentFixture<MensagemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
