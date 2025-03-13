import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../models/Auth';
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title: String = 'Por favor ingresar credenciales de acceso';
  title2: String = 'Crear Usuario';

  auth: Auth;
  user: User;
  newUser: User;

  crear: boolean = false;

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

  setCrear(){
    this.crear =!this.crear;

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
          this.user = new User();
          if(u.user == '-1'){
            console.log('No existe');
            Swal.fire(
              'Error de validación',
              'Usuario no encontrado',
              'error'
            );
            this.newUser.user = this.auth.user;
            this.setCrear();
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
    this.setCrear();
    this.newUser = new User();
    this.auth = new Auth();
  }
}
