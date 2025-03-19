import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  user: User;

  @Input() newUser: User = new User();

  @Output() mostrarCrearEmmit:  EventEmitter<boolean> = new EventEmitter();

  constructor(private service: AuthService){
    this.user = new User();
  }

  addUser(): void{
    console.log(this.newUser);
    //console.log(this.mostrarCrear);
    this.service.create(this.newUser).subscribe( u => this.user = u );
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado correctamente!",
      icon: "success"
    });
    this.mostrarCrearEmmit.emit(false);
  }

  cancelar(): void {
    this.mostrarCrearEmmit.emit(false);
  }

}
