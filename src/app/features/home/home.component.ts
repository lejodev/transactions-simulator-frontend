import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SHARED_MATERIAL_IMPORTS } from '../../shared/material/material.imports';
import { UsersPicker } from "../transactions/components/users-picker/users-picker";
import { User } from '../users/models/user.model';
import { Services } from '../users/services/user.service';
import { TransactionForm } from "../transactions/components/transaction-form/transaction-form";
import { TransactionService } from '../transactions/services/transaction.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        SHARED_MATERIAL_IMPORTS,
        UsersPicker,
        TransactionForm
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    users = signal<User[]>([]);
    selectedUser = signal<User | null>(null);

    constructor(
        private userService: Services,
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users.set(users);
        });
    }

    onUserSelected(user: User) {
        this.selectedUser.set(user);
    }

    onTransactionSubmit(transaction: { amount: number, user: User }) {
        if (this.selectedUser()) {
            console.log("TRANSACTION", transaction);
            this.transactionService.saveTransaction({
                amount: transaction.amount,
                user: this.selectedUser()!
            });
            this.selectedUser.set(null);
            // Navigate to history page to show the new transaction
            this.router.navigate(['/history']);
        }
        else {
            console.log("No user selected");
        }
    }

    navigateToHistory() {
        this.router.navigate(['/history']);
    }

}
