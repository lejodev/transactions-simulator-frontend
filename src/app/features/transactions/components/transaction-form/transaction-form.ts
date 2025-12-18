import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../users/models/user.model';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SHARED_MATERIAL_IMPORTS],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss',
})
export class TransactionForm {
  @Input() selectedUser: User | null = null;
  @Output() formSubmit = new EventEmitter<{ amount: number, user: User }>();
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid && this.selectedUser) {
      console.log(this.selectedUser, this.transactionForm.value.amount);

      this.formSubmit.emit({
        user: this.selectedUser,
        amount: this.transactionForm.value.amount
      });
      this.transactionForm.reset();
    }
  }
}
