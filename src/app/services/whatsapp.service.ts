import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WhatsappModel } from '../models/whatsapp.model';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private http:HttpClient) { }


  enviarMensaje(mensaje:WhatsappModel){

    return this.http.post('http://localhost:3001/lead', mensaje);

  }


}
