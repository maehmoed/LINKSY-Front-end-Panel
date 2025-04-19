import React from 'react';

// Define a shared type for customer data
export type Customer = {
  id: number;
  name: string;
  company?: string; // Optional company name
  isCompanyAccount: boolean; // Flag for company account specific fields
  type: 'Developer Account' | 'Regular Account';
  email: string;
  phone: string;
  activityStatus: 'Active' | 'Inactive';
  accountStatus: 'Activated' | 'Deactivated' | 'Blocked' | 'Subscribed' | 'Unsubscribed';
  totalTransactions: string; // Using string to include 'DA'
  openingDate: string; // Format as needed, e.g., 'YYYY-MM-DD'
  isAuthenticated: boolean; // Authentication status
  lastLoginIp?: string;
  lastLoginLocation?: string;
  uploadedFiles?: { name: string; url: string }[]; // Example structure
  activeServices?: string[]; // List of service names
  address?: string;
  dob?: string; // Date of birth (only if authenticated)
  nationalId?: string; // National ID (only if authenticated)
  // Company specific fields (only if isCompanyAccount is true)
  companyRegNumber?: string;
  taxNumber?: string;
  statsNumber?: string;
  companyAddress?: string;
};

// Define a type for Financial Transactions
export type FinancialTransaction = {
  id: string; // Transaction ID (e.g., 'INV-001', 'PAY-002')
  dateTime: string; // ISO string or formatted date/time
  type: 'Invoice' | 'Payment Receipt';
  status: 'Draft' | 'Paid' | 'Pending' | 'Canceled' | 'Refunded';
  paymentMethod: 'Cash' | 'CIB Card' | 'EDAHABIA Card' | 'N/A'; // N/A for Draft invoices etc.
  amount: number; // Total amount
  amountPaid: number;
  remainingAmount: number;
  details: string; // Full transaction details
  customerId: number; // Link to the customer
};

// Placeholder data - move this to a shared location or context later if needed
export const customersData: Customer[] = [
  {
    id: 1, name: 'Alice Wonderland', company: 'Wonder Industries', isCompanyAccount: true, type: 'Regular Account', email: 'alice@wonder.com', phone: '+1-555-1234', activityStatus: 'Active', accountStatus: 'Activated', totalTransactions: '15 000 DA', openingDate: '2023-01-15', isAuthenticated: true, lastLoginIp: '192.168.1.100', lastLoginLocation: 'New York, USA', uploadedFiles: [{ name: 'id_card.pdf', url: '#' }, { name: 'proof_of_address.jpg', url: '#' }], activeServices: ['Web Hosting', 'Domain Registration'], address: '123 Rabbit Hole Lane, Wonderland', dob: '1990-05-20', nationalId: 'WND123456789', companyRegNumber: 'WI-REG-111', taxNumber: 'WI-TAX-222', statsNumber: 'WI-STAT-333', companyAddress: '456 Looking Glass Ave, Wonderland'
  },
  {
    id: 2, name: 'Bob The Builder', company: 'BuildIt Co.', isCompanyAccount: true, type: 'Developer Account', email: 'bob@buildit.dev', phone: '+1-555-5678', activityStatus: 'Active', accountStatus: 'Subscribed', totalTransactions: '250 000 DA', openingDate: '2022-11-01', isAuthenticated: true, lastLoginIp: '10.0.0.5', lastLoginLocation: 'London, UK', activeServices: ['Cloud Servers', 'API Access', 'Database Hosting'], address: '45 Fixit Street, Buildsville', dob: '1985-11-01', nationalId: 'BLD987654321', companyRegNumber: 'BIC-REG-444', taxNumber: 'BIC-TAX-555', statsNumber: 'BIC-STAT-666', companyAddress: '789 Hammer Road, Buildsville'
  },
  {
    id: 3, name: 'Charlie Chaplin', isCompanyAccount: false, type: 'Regular Account', email: 'charlie@silent.org', phone: '+1-555-9012', activityStatus: 'Inactive', accountStatus: 'Unsubscribed', totalTransactions: '5 000 DA', openingDate: '2023-05-20', isAuthenticated: false, lastLoginIp: '172.16.0.10', lastLoginLocation: 'Paris, France', address: '789 Silent Alley, Film City'
  },
  {
    id: 4, name: 'Diana Prince', company: 'Themyscira Exports', isCompanyAccount: true, type: 'Regular Account', email: 'diana@themyscira.com', phone: '+1-555-3456', activityStatus: 'Active', accountStatus: 'Blocked', totalTransactions: '500 DA', openingDate: '2024-01-10', isAuthenticated: true, lastLoginIp: '203.0.113.1', lastLoginLocation: 'Themyscira', uploadedFiles: [{ name: 'passport.pdf', url: '#' }], activeServices: ['Secure Storage'], address: '1 Paradise Island, Themyscira', dob: '1978-03-10', nationalId: 'THM112233445', companyRegNumber: 'TE-REG-777', taxNumber: 'TE-TAX-888', statsNumber: 'TE-STAT-999', companyAddress: '2 Amazon Way, Themyscira'
  },
  {
    id: 5, name: 'Ethan Hunt', isCompanyAccount: false, type: 'Developer Account', email: 'ethan@imf.gov', phone: '+1-555-7890', activityStatus: 'Active', accountStatus: 'Activated', totalTransactions: '1 200 000 DA', openingDate: '2021-08-30', isAuthenticated: true, lastLoginIp: '8.8.8.8', lastLoginLocation: 'Washington D.C., USA', activeServices: ['VPN Access', 'Encrypted Comm'], address: 'Confidential', dob: '1980-07-15', nationalId: 'IMF007007007'
   },
];

// Mock Financial Transactions Data
export const transactionsData: FinancialTransaction[] = [
  { id: 'INV-001', customerId: 1, dateTime: '2024-07-26T10:30:00Z', type: 'Invoice', status: 'Paid', paymentMethod: 'CIB Card', amount: 5000, amountPaid: 5000, remainingAmount: 0, details: 'Annual Web Hosting Renewal for wonder.com. Includes standard package features.' },
  { id: 'PAY-001', customerId: 1, dateTime: '2024-07-26T10:35:00Z', type: 'Payment Receipt', status: 'Paid', paymentMethod: 'CIB Card', amount: 5000, amountPaid: 5000, remainingAmount: 0, details: 'Payment for Invoice INV-001 via CIB Card ending in 1234.' },
  { id: 'INV-002', customerId: 1, dateTime: '2024-08-01T14:00:00Z', type: 'Invoice', status: 'Pending', paymentMethod: 'N/A', amount: 10000, amountPaid: 0, remainingAmount: 10000, details: 'Domain Registration for wonderland.net. Standard 1-year registration.' },
  { id: 'INV-003', customerId: 2, dateTime: '2024-07-15T09:00:00Z', type: 'Invoice', status: 'Paid', paymentMethod: 'EDAHABIA Card', amount: 150000, amountPaid: 150000, remainingAmount: 0, details: 'Cloud Server Setup - Project Phoenix. Includes 2 vCPU, 4GB RAM, 100GB SSD.' },
  { id: 'PAY-002', customerId: 2, dateTime: '2024-07-15T09:10:00Z', type: 'Payment Receipt', status: 'Paid', paymentMethod: 'EDAHABIA Card', amount: 150000, amountPaid: 150000, remainingAmount: 0, details: 'Payment for INV-003 via EDAHABIA.' },
  { id: 'INV-004', customerId: 2, dateTime: '2024-08-10T11:00:00Z', type: 'Invoice', status: 'Draft', paymentMethod: 'N/A', amount: 100000, amountPaid: 0, remainingAmount: 100000, details: 'API Access Tier Upgrade - Gold Plan. Monthly subscription.' },
  { id: 'INV-005', customerId: 3, dateTime: '2024-06-01T16:20:00Z', type: 'Invoice', status: 'Canceled', paymentMethod: 'N/A', amount: 5000, amountPaid: 0, remainingAmount: 5000, details: 'Consultation Services - Initial meeting. Canceled by customer.' },
  { id: 'INV-006', customerId: 4, dateTime: '2024-07-20T13:00:00Z', type: 'Invoice', status: 'Paid', paymentMethod: 'Cash', amount: 500, amountPaid: 500, remainingAmount: 0, details: 'Secure Storage Box Rental - Small size. Paid in cash at office.' },
  { id: 'PAY-003', customerId: 4, dateTime: '2024-07-20T13:05:00Z', type: 'Payment Receipt', status: 'Paid', paymentMethod: 'Cash', amount: 500, amountPaid: 500, remainingAmount: 0, details: 'Cash payment received for INV-006.' },
  { id: 'INV-007', customerId: 5, dateTime: '2024-08-05T08:45:00Z', type: 'Invoice', status: 'Paid', paymentMethod: 'CIB Card', amount: 1200000, amountPaid: 1200000, remainingAmount: 0, details: 'Project Chimera - Phase 1 Payment. Includes VPN setup and encrypted comms license.' },
  { id: 'PAY-004', customerId: 5, dateTime: '2024-08-05T08:50:00Z', type: 'Payment Receipt', status: 'Paid', paymentMethod: 'CIB Card', amount: 1200000, amountPaid: 1200000, remainingAmount: 0, details: 'Payment for INV-007 via CIB Card ending in 5678.' },
  { id: 'INV-008', customerId: 1, dateTime: '2024-08-15T11:00:00Z', type: 'Invoice', status: 'Refunded', paymentMethod: 'CIB Card', amount: 500, amountPaid: 500, remainingAmount: 0, details: 'SSL Certificate - Basic. Refunded due to incorrect order.' },
  { id: 'PAY-005', customerId: 1, dateTime: '2024-08-15T11:05:00Z', type: 'Payment Receipt', status: 'Refunded', paymentMethod: 'CIB Card', amount: -500, amountPaid: -500, remainingAmount: 0, details: 'Refund for INV-008 processed to CIB Card ending in 1234.' },
];


// Helper function to determine badge color based on status (can be shared)
export const getStatusBadgeColor = (status: Customer['accountStatus'] | Customer['activityStatus'] | FinancialTransaction['status']): string => {
  switch (status) {
    case 'Active':
    case 'Activated':
    case 'Subscribed':
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Inactive':
    case 'Unsubscribed':
    case 'Pending':
    case 'Draft':
      return 'bg-yellow-100 text-yellow-800';
    case 'Deactivated':
    case 'Blocked':
    case 'Canceled':
      return 'bg-red-100 text-red-800';
    case 'Refunded':
      return 'bg-purple-100 text-purple-800'; // Example color for Refunded
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to determine badge color and icon for account type (can be shared)
export const getTypeBadgeStyle = (type: Customer['type']): { color: string; icon: React.ReactNode } => {
  // Assuming User and Code icons are imported where this is used
  switch (type) {
    case 'Developer Account':
      // Placeholder for icon, import where needed
      return { color: 'bg-blue-100 text-blue-800', icon: React.createElement('div', { className: 'lucide-code mr-1' }) };
    case 'Regular Account':
      // Placeholder for icon, import where needed
      return { color: 'bg-purple-100 text-purple-800', icon: React.createElement('div', { className: 'lucide-user mr-1' }) };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: null };
  }
};

// Helper function for transaction type badge
export const getTransactionTypeBadge = (type: FinancialTransaction['type']): string => {
  switch (type) {
    case 'Invoice':
      return 'bg-indigo-100 text-indigo-800';
    case 'Payment Receipt':
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function for payment method badge
export const getPaymentMethodBadge = (method: FinancialTransaction['paymentMethod']): string => {
  switch (method) {
    case 'Cash':
      return 'bg-lime-100 text-lime-800';
    case 'CIB Card':
      return 'bg-orange-100 text-orange-800';
    case 'EDAHABIA Card':
      return 'bg-cyan-100 text-cyan-800';
    case 'N/A':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
