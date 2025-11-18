import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { InputVoice } from './components/input-voice/input-voice';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      declarations: [
        App,
        InputVoice
      ],
    }).compileComponents();
  });
  


  it('Crear el componente correctamente aqui es el success', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('¡Te damos la bienvenida a Banco Azteca', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const h1Text = compiled.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim();
    expect(h1Text).toContain('¡Te damos la bienvenida a Banco Azteca!');
  });
});
