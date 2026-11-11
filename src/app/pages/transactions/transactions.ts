
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

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
export class Transactions implements OnInit, OnDestroy {

  transactions: Transaction[] = [];

  isLoading = false;
  errorMessage = '';

  isModalOpen = false;
  isSaving = false;

  successMessage = '';
  isSuccessVisible = false;

  saveErrorMessage = '';

  transactionForm: TransactionRequest = this.createEmptyForm();

  private successMessageTimeout: ReturnType<typeof setTimeout> | undefined;
  private successRemovalTimeout: ReturnType<typeof setTimeout> | undefined;


  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadTransactions();
  }


  ngOnDestroy(): void {
    this.clearSuccessTimeouts();
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
        this.cdr.detectChanges();
      }

    });
  }


  openModal(): void {
    this.transactionForm = this.createEmptyForm();

    this.successMessage = '';
    this.isSuccessVisible = false;

    this.saveErrorMessage = '';

    this.clearSuccessTimeouts();

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
    this.isSuccessVisible = false;

    this.saveErrorMessage = '';

    this.clearSuccessTimeouts();


    this.transactionService.addTransaction(this.transactionForm).subscribe({

      next: (response) => {

        console.log('Transaction saved:', response);

        this.isSaving = false;
        this.isModalOpen = false;

        // Display success notification
        // Display success notification
        this.successMessage = 'Transaction added successfully.';
        this.isSuccessVisible = true;

        this.cdr.detectChanges();

        // Wait 3 seconds before starting fade-out
        this.successMessageTimeout = setTimeout(() => {

          this.isSuccessVisible = false;

          this.cdr.detectChanges();

          // Remove after the 2-second fade-out
          this.successRemovalTimeout = setTimeout(() => {

            this.successMessage = '';
            this.successRemovalTimeout = undefined;

            this.cdr.detectChanges();

          }, 2000);

          this.successMessageTimeout = undefined;

        }, 3000);


        this.loadTransactions();

      },


      error: (error) => {

        console.error('Failed to save transaction:', error);

        this.isSaving = false;

        this.saveErrorMessage =
          'Unable to save transaction. Please try again.';

        this.cdr.detectChanges();

      }

    });

  }


  private clearSuccessTimeouts(): void {

    if (this.successMessageTimeout) {
      clearTimeout(this.successMessageTimeout);
      this.successMessageTimeout = undefined;
    }

    if (this.successRemovalTimeout) {
      clearTimeout(this.successRemovalTimeout);
      this.successRemovalTimeout = undefined;
    }

  }


  private createEmptyForm(): TransactionRequest {

    return {
      transactionDate: new Date().toISOString().split('T')[0],
      accountNumber: '',
      accountHolderName: '',
      amount: 0
    };

  }


  get settledCount(): number {

    return this.transactions.filter(
      transaction => transaction.status === 'Settled'
    ).length;

  }


  get pendingCount(): number {

    return this.transactions.filter(
      transaction => transaction.status === 'Pending'
    ).length;

  }


  get failedCount(): number {

    return this.transactions.filter(
      transaction => transaction.status === 'Failed'
    ).length;

  }

}
