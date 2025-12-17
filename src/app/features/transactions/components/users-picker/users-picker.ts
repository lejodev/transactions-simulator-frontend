import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../users/models/user.model';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-users-picker',
  imports: [SHARED_MATERIAL_IMPORTS],
  templateUrl: './users-picker.html',
  styleUrl: './users-picker.scss',
})
export class UsersPicker {
  @Input() users: User[] = [];
  @Input() selectedUser: User | null = null;
  @Output() userSelected = new EventEmitter<User>();

  constructor() { }

  selectUser(user: User) {
    this.userSelected.emit(user);
  }
}
