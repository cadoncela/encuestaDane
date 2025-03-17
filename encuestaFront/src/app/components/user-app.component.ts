import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../models/Auth';
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [FormsModule, UserFormComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title: String = 'Por favor ingresar credenciales de acceso';
  title2: String = 'Crear Usuario';

  auth: Auth;
  user: User;
  newUser: User;

  mostrarCrear: boolean = false;

  ngOnInit(): void {
    //this.onSubmit();
    this.user = new User();
    this.auth = new Auth();
  }

  constructor(private service: AuthService){
    this.auth = new Auth();
    this.user = new User();
    this.newUser = new User();
  }

  setMostrarCrear(){
    this.mostrarCrear =!this.mostrarCrear;

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
          } else if(u.user.length > 4){
            console.log('Autenticado');
            Swal.fire(
              'Autenticado!',
              'Usuario autenticado',
              'success'
            );
            this.user.email = u.email;
            this.user.name = u.name;
            this.user.user = u.user;
            this.user.id = u.id;
          }
        });

      }
    }
  }

  addUser(): void{
    console.log(this.newUser);
    this.service.create(this.newUser).subscribe( u => this.user = u );
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado correctamente!",
      icon: "success"
    });
  }

  cancelar(): void {
    this.setMostrarCrear();
    this.newUser = new User();
    this.auth = new Auth();
  }
}
