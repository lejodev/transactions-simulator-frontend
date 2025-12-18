import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { TransactionsList } from '../../components/transactions-list/transactions-list';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
    selector: 'app-transactions-history',
    standalone: true,
    imports: [
        CommonModule,
        SHARED_MATERIAL_IMPORTS,
        TransactionsList
    ],
    templateUrl: './transactions-history.component.html',
    styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent {

    transactions = signal<Transaction[]>([]);

    constructor(
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.transactionService.getTransactions().subscribe(transactions => {
            this.transactions.set(transactions);
        });
    }

    navigateToHome() {
        this.router.navigate(['/']);
    }
}
