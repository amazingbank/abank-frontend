export interface Account {
  id: number;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'CREDIT';
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  userId: number;
  createdAt?: string;
}

export interface Transaction {
  id: number;
  transactionId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  fromAccountId: number | null;
  toAccountId: number | null;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  blockchainHash?: string;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  role: 'CUSTOMER' | 'BUSINESS' | 'ADMIN';
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface AuthResponse {
  id: number;
  username: string;
  role: string;
  kycStatus: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface InterestResult {
  principal: number;
  rate: number;
  years: number;
  simpleInterest: number;
  compoundInterest: number;
  totalWithSimple: number;
  totalWithCompound: number;
  frequency: number;
}

export interface InsightSummary {
  totalAssets: number;
  monthlyIncome: number;
  monthlySpending: number;
  netCashFlow: number;
  savingsRate: string;
  categoryBreakdown: Record<string, number>;
  advice: string[];
  budgetPlan: Record<string, number>;
  generatedAt: string;
}

export interface Portfolio {
  totalAssets: number;
  byType: Record<string, number>;
  accountCount: number;
}
