import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, Animation, AnimationController, IonCard } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  currentUser: string | null = null;
  welcomeForm!: FormGroup;
  private animation!: Animation;

  constructor(private formBuilder:FormBuilder, private alertCtrl:AlertController, private animationCtrl: AnimationController) {
    // const animation: Animation = this.animationCtrl.create()

   }

  async ngOnInit() {
    this.welcomeForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      nivelEd: new FormControl('', [Validators.required]),
      fecNac: new FormControl('', [Validators.required]),
    });
    this.currentUser = await this.loadCurrentUser();
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
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
    console.log('info')
    this.alertPresent('Mensaje')
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
