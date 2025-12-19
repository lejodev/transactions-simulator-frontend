import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SHARED_MATERIAL_IMPORTS } from '../../shared/material/material.imports';
import { UsersPicker } from "../transactions/components/users-picker/users-picker";
import { User } from '../users/models/user.model';
import { Services } from '../users/services/user.service';
import { TransactionForm } from "../transactions/components/transaction-form/transaction-form";
import { TransactionService } from '../transactions/services/transaction.service';
import { CusModalComponent } from '../transactions/components/cus-modal/cus-modal.component';

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
        private router: Router,
        private dialog: MatDialog
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
            const createdTransaction = this.transactionService.saveTransaction({
                amount: transaction.amount,
                user: this.selectedUser()!
            });

            this.selectedUser.set(null);

            // Show CUS Modal
            const dialogRef = this.dialog.open(CusModalComponent, {
                data: { transaction: createdTransaction },
                width: '450px',
                maxWidth: '90vw'
            });

            dialogRef.afterClosed().subscribe(() => {
                // Navigate to history page after modal is closed
                this.router.navigate(['/history']);
            });
        }
        else {
            console.log("No user selected");
        }
    }

    navigateToHistory() {
        this.router.navigate(['/history']);
    }

}
