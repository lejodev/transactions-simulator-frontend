import { Component, Input, signal } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';


@Component({
  selector: 'app-transactions-list',
  imports: [CommonModule, SHARED_MATERIAL_IMPORTS],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss',
})
export class TransactionsList {

  @Input() transactions: Transaction[] = [];

  revealedCusId = signal<string | null>(null);
  decryptedCusValue = signal<string>('');

  constructor(private transactionService: TransactionService) { }

  toggleCus(transaction: Transaction): void {
    if (this.revealedCusId() === transaction.id) {
      this.revealedCusId.set(null);
      this.decryptedCusValue.set('');
    } else {
      const decrypted = this.transactionService.revealCus(transaction.cus);
      this.decryptedCusValue.set(decrypted);
      this.revealedCusId.set(transaction.id);
    }
  }


}
