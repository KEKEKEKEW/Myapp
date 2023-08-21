import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isTextFieldType!: boolean;
  loginForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private loadingCtrl: LoadingController,
    private menu: MenuController,
    private router: Router,
    private alertCtrl:AlertController) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginUser: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(3)]),
      loginPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    });
    this.checkLength();
  }

  async alertPresent(header:string,message:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:['OK'],
    });
    alert.present();
    this.loginForm.setValue
  }

  togglePasswordFieldType(){//Ojito de passwd
    this.isTextFieldType = !this.isTextFieldType;
  }
  
  /**
 * Realiza el proceso de inicio de sesión del usuario.
 * Si los criterios de inicio de sesión se cumplen, almacena el nombre de usuario y navega a la página de inicio.
 * Si los criterios no se cumplen, muestra una alerta de inicio de sesión fallido.
 */
  onUserLogin(){
    if(this.loginForm.value.loginUser.length > 2 && this.loginForm.value.loginUser.length < 9 && this.loginForm.value.loginPassword.length === 4){
      localStorage.setItem('currentUser', this.loginForm.value.loginUser);
      this.router.navigateByUrl('inicio');
    }
    else{
      this.alertPresent('Login fallido','Intente nuevamente');
    }
  }

  /**
 * Observa los cambios en la longitud de la contraseña mientras el usuario la está ingresando.
 * Si la longitud de la contraseña no cumple con los criterios, se ejecuta un evento.
 */
  checkLength(){
    this.loginForm.get('loginPassword')?.valueChanges.subscribe((loginPassword) => {
      console.log(loginPassword);
      if(loginPassword.length > 4 && loginPassword.length < 4){
        //evento on everyinput si la pass.length es != 4
      }
    });
  }
    /**
   * Se desuscribe de la suscripción a 'valueChanges' cuando ya no sea necesario.
   */
  // valueChangesSubscription.unsubscribe();
  

}
