import { Component, Input } from '@angular/core';
import { User } from '../../../users/models/user.model';
import { SHARED_MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-transaction-form',
  imports: [SHARED_MATERIAL_IMPORTS],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss',
})
export class TransactionForm {

  @Input() selectedUser: User | null = null;

}
