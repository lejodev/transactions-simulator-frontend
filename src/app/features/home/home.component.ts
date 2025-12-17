import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SHARED_MATERIAL_IMPORTS } from '../../shared/material/material.imports';
import { UsersPicker } from "../transactions/components/users-picker/users-picker";
import { User } from '../users/models/user.model';
import { Services } from '../users/services/user.service';
import { TransactionForm } from "../transactions/components/transaction-form/transaction-form";
import { TransactionsList } from "../transactions/components/transactions-list/transactions-list";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        SHARED_MATERIAL_IMPORTS,
        UsersPicker,
        TransactionForm,
        TransactionsList
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    users = signal<User[]>([]);
    selectedUser = signal<User | null>(null);

    constructor(private userService: Services) { }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users.set(users);
        });
    }

    // Event 
    onUserSelected(user: User) {
        this.selectedUser.set(user);
    }

}
