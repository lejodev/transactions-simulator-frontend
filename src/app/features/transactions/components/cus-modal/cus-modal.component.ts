import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
    selector: 'app-cus-modal',
    standalone: true,
    imports: [CommonModule, SHARED_MATERIAL_IMPORTS],
    templateUrl: './cus-modal.component.html',
    styleUrl: './cus-modal.component.scss'
})
export class CusModalComponent {
    isRevealed = signal<boolean>(false);
    decryptedCus = signal<string>('');

    constructor(
        public dialogRef: MatDialogRef<CusModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { transaction: Transaction },
        private transactionService: TransactionService
    ) {
        this.decryptedCus.set(this.transactionService.revealCus(this.data.transaction.cus));
    }

    onPressStart() {
        this.isRevealed.set(true);
    }

    onPressEnd() {
        this.isRevealed.set(false);
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
