import { TestBed } from '@angular/core/testing';

import { Encrypt } from './encrypt';
import { HttpClientTestingModule ,HttpTestingController } from '@angular/common/http/testing';

describe('Servicio de encriptacion', () => {
  let service: Encrypt;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Encrypt]
    });
    service = TestBed.inject(Encrypt);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('Servicio creado correctamente', () => {
    expect(service).toBeTruthy();
  });
  it('Enviar el texto al backend y recibir la respuesta', () => {
    const texto = 'Prueba123';
    const mockResponse = { ok: true, encrypted: 'XYZABC123' };

    service.encryptText(texto).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/encrypt');

    // Verifica método correcto
    expect(req.request.method).toBe('POST');

    // Verifica body enviado
    expect(req.request.body).toEqual({ text: texto });

    // Simula la respuesta del backend
    req.flush(mockResponse);
  });
});
