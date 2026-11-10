
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Transaction,
  TransactionRequest
} from '../../models/transaction';

import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-transactions',
  imports: [FormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions implements OnInit {

  transactions: Transaction[] = [];

  isLoading = false;
  errorMessage = '';

  isModalOpen = false;
  isSaving = false;

  successMessage = '';
  saveErrorMessage = '';

  transactionForm: TransactionRequest = this.createEmptyForm();

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.errorMessage = '';


    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load transactions:', error);

        this.errorMessage =
          'Unable to retrieve transactions. Please try again.';

        this.isLoading = false;
      }
    });
  }

  openModal(): void {
    this.transactionForm = this.createEmptyForm();

    this.successMessage = '';
    this.saveErrorMessage = '';

    this.isModalOpen = true;
  }

  closeModal(): void {
    if (this.isSaving) {
      return;
    }

    this.isModalOpen = false;
  }

  saveTransaction(): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.saveErrorMessage = '';

    this.transactionService.addTransaction(this.transactionForm).subscribe({
      next: (response) => {
        console.log('Transaction saved:', response);

        this.isSaving = false;
        this.isModalOpen = false;

        this.successMessage = 'Transaction added successfully.';

        this.loadTransactions();
      },

      error: (error) => {
        console.error('Failed to save transaction:', error);

        this.isSaving = false;

        this.saveErrorMessage =
          'Unable to save transaction. Please try again.';
      }
    });
  }

  private createEmptyForm(): TransactionRequest {
    return {
      transactionDate: new Date().toISOString().split('T')[0],
      accountNumber: '',
      accountHolderName: '',
      amount: 0
    };
  }
}
