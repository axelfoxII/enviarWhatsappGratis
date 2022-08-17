import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { WhatsappService } from './services/whatsapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto Whatsapp';
  mensajeForm:any;

  respuesta:any={};

  constructor(private whatsappSvc:WhatsappService, private fb:FormBuilder) {

    this.mensajeForm = fb.group({
    
      phone:['', [Validators.required]],
      message:['', [Validators.required]],


    })  

  }

  enviarWhatsapp(){

    if (this.mensajeForm.value.phone && this.mensajeForm.value.message ) {
     
      let mensaje={

        message:this.mensajeForm.value.message,
        phone:this.mensajeForm.value.phone
      }
  
      this.whatsappSvc.enviarMensaje(mensaje).subscribe(res=>{

        this.respuesta = res
        console.log(this.respuesta.responseExSave.error)
        
        if (this.respuesta.responseExSave.error === 'WAIT_LOGIN') {
          Swal.fire('ERROR', 'Debe escanear el codigo QR', 'error');              
        }else if(this.respuesta.responseExSave.error === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.'){
         
         Swal.fire('ERROR', 'Se cerro la sesion', 'error');
         this.mensajeForm.reset();

        }else{
         Swal.fire('Exito', 'Mensaje enviado', 'success');
         this.mensajeForm.reset();
        }

      })
  
      
    }else{


      Swal.fire('ERROR', 'Debe llenar todos los campos', 'error');


    }  
    

  }






}
