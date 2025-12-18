import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SHARED_MATERIAL_IMPORTS } from '../../shared/material/material.imports';
import { UsersPicker } from "../transactions/components/users-picker/users-picker";
import { User } from '../users/models/user.model';
import { Services } from '../users/services/user.service';
import { TransactionForm } from "../transactions/components/transaction-form/transaction-form";
import { TransactionsList } from "../transactions/components/transactions-list/transactions-list";
import { TransactionService } from '../transactions/services/transaction.service';
import { Transaction } from '../transactions/models/transaction.model';

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
    transactions = signal<Transaction[]>([]);

    constructor(
        private userService: Services,
        private transactionService: TransactionService) { }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users.set(users);
        });
        this.transactionService.getTransactions().subscribe(transactions => {
            this.transactions.set(transactions);
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
            this.transactionService.getTransactions().subscribe(transactions => {
                this.transactions.set(transactions);
            });
            this.selectedUser.set(null);
        }
        else {
            console.log("No user selected");
        }
    }

}
