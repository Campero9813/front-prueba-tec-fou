import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InputVoice } from './input-voice';

describe('InputVoice', () => {
  let component: InputVoice;
  let fixture: ComponentFixture<InputVoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputVoice],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputVoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
