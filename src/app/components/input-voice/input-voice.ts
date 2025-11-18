import { Component, NgZone } from '@angular/core';
import { Encrypt } from '../../services/encrypt';

@Component({
  selector: 'app-input-voice',
  standalone: false,
  templateUrl: './input-voice.html',
  styleUrl: './input-voice.css',
})
export class InputVoice {
  name = '';
  encrypted = '';
  recognizing = false;

  recognition: any;

  constructor(
    private encrypt: Encrypt,
    private ngZone: NgZone
  ){
    const SpeechRecognition  = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      console.error('El navegador no soporta SpeechRecognition');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-MX';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for(let i = event.resultIndex; i < event.results.length; i++){
        transcript += event.results[i][0].transcript;
      }

      //Validar
      let clean = transcript.replace(/[^a-zA-Z0-9]/g, '');
      clean = clean.substring(0, 15);

      this.ngZone.run(() => {
        this.name = clean;
      })
    }

    this.recognition.onend = () => {
      this.ngZone.run(() => {
        this.recognizing = false
      })
    }
  }

  startRecognition(){
    console.log("Iniciando dictado", this.recognition);

    if (!this.recognition || typeof this.recognition.start !== 'function'){
      console.error("El reconocimiento no se inicio correctamente");
      return;
    }

    this.recognizing = true

    try {
      this.recognition.start();
    } catch (error) {
      console.warn("Error al iniciar el micro", error)
    }
  }

  sendToEncrypt() {
    console.log("Iniciando encriptado: ");

    if ( !this.name || !this.name.trim()){
      console.log("No hay nombre para encriptar");
      return
    }
    console.log("Texto original: ", this.name)

    this.encrypt.encryptText(this.name).subscribe({
      next: (res) => {
        console.log("Texto original enviado al api: ", res.original)
        console.log("Respuesta de la api: ", res)
        if (res) {
        console.log("Texto encriptado", res.encrypted)
        this.encrypted = res.encrypted;  
        }else{
          console.log("La api no regreso 'data', devolvio: ", res);
        }
      },
      error: (err) => {
        console.error("Error al llamar la api: ", err)
      }
    })
  }
}
