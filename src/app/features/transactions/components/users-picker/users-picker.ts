import { Component, EventEmitter, Input, Output, signal, computed, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../users/models/user.model';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-users-picker',
  imports: [SHARED_MATERIAL_IMPORTS],
  templateUrl: './users-picker.html',
  styleUrl: './users-picker.scss',
})
export class UsersPicker implements OnChanges {
  @Input() users: User[] = [];
  @Input() selectedUser: User | null = null;
  @Output() userSelected = new EventEmitter<User>();

  // Internal signal to make users reactive
  private usersSignal = signal<User[]>([]);
  searchTerm = signal<string>('');

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const users = this.usersSignal(); // Use signal instead of direct @Input
    if (!term) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(term)
    );
  });

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && changes['users'].currentValue) {
      this.usersSignal.set(changes['users'].currentValue);
    }
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
  }
}
