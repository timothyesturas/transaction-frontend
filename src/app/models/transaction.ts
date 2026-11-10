export interface Transaction {
    transactionDate: string;
    accountNumber: string;
    accountHolderName: string;
    amount: number;
    status: 'Pending' | 'Settled' | 'Failed';
}

export type TransactionRequest = Omit<Transaction, 'status'>;