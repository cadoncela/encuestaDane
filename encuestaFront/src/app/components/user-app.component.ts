import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../models/Auth';
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { UserFormComponent } from './user-form/user-form.component';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserFormComponent, FormsModule, RouterModule],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title: String = 'Por favor ingresar credenciales de acceso';
  title2: String = 'Crear Usuario';

  auth: Auth;
  user: User;
  newUser: User;

  mostrarCrear: boolean = false;
  flagSurvey = false;

  ngOnInit(): void {
    //this.onSubmit();
    this.user = new User();
    this.auth = new Auth();
  }

  constructor(
      private router: Router,
      private service: AuthService){
    this.auth = new Auth();
    this.user = new User();
    this.newUser = new User();
  }

  setValues(){
    this.auth = new Auth();
    this.user = new User();
    this.newUser = new User();
  }

  setMostrarCrear(){
    if(this.mostrarCrear){
      this.setValues();
    }
    this.mostrarCrear =!this.mostrarCrear;

  }

  setFlagSurvey(){
    this.flagSurvey =!this.flagSurvey;
    if(this.flagSurvey){
      this.router.navigate(['survey']);
    }
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      console.log(this.auth);
      if(!this.auth.user || !this.auth.password){
        Swal.fire(
          'Error de validación',
          'Usuario y clave requeridos',
          'error'
        );
      }else{
        this.service.findUser(this.auth).subscribe( u => {
          console.log(u);
          //this.user = new User();
          if(u.user == '-1'){
            console.log('No existe');
            /*
            Swal.fire(
              'Error de validación',
              'Usuario no encontrado',
              'error'
            );
            */
            this.newUser.user = this.auth.user;
            this.setMostrarCrear();
          } else if(u.user == '-2'){
            console.log('Clave incorrecta');
            Swal.fire(
              'Error de validación',
              'Clave incorrecta',
              'error'
            );
            this.setValues();
          } else if(u.user.length > 4){
            console.log('Autenticado');
            /*Swal.fire(
              'Autenticado!',
              'Usuario autenticado',
              'success'
            );
            this.user.email = u.email;
            this.user.name = u.name;
            this.user.user = u.user;
            this.user.id = u.id;*/
            this.setFlagSurvey();
            this.router.navigate(['/survey', u.id]);
          }
        });

      }
    }
  }

  irAPagina(): void {
    this.router.navigate(['/survey']);
  }


}
