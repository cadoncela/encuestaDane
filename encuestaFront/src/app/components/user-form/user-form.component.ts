import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  @Input() user: User = new User();

}
