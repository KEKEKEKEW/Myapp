import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  currentUser: string | null = null;
  welcomeForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private alertCtrl:AlertController) { }

  async ngOnInit() {
    this.currentUser = await this.loadCurrentUser();
    this.welcomeForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      nivelEd: new FormControl('', [Validators.required]),
      fecNac: new FormControl('', [Validators.required]),
    });
  }
  
  /**
 * Carga el valor de 'currentUser' desde el almacenamiento local de forma asíncrona.
 * @returns Una promesa que se resuelve con el valor de 'currentUser' o 'null' si no existe.
 * @throws Si ocurre un error durante la carga.
 */
  private async loadCurrentUser(): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      const currentUser = localStorage.getItem('currentUser');
      resolve(currentUser);
    });
  }

  onUserInfo(){
  }


/**
 * Muestra una alerta con el encabezado proporcionado y un mensaje que incluye el nombre y apellido.
 *
 * @param {string} header - El encabezado de la alerta.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se cierra la alerta.
 */
  async alertPresent(header:string){
    let message:string = "Su Nombre es: "+this.welcomeForm.value.nombre+' '+this.welcomeForm.value.apellido; 
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:['OK'],
    });
    alert.present();
  }
}
