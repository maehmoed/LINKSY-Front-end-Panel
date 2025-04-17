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

// Helper function to determine badge color based on status (can be shared)
export const getStatusBadgeColor = (status: Customer['accountStatus'] | Customer['activityStatus']): string => {
  switch (status) {
    case 'Active':
    case 'Activated':
    case 'Subscribed':
      return 'bg-green-100 text-green-800';
    case 'Inactive':
    case 'Unsubscribed':
      return 'bg-yellow-100 text-yellow-800';
    case 'Deactivated':
    case 'Blocked':
      return 'bg-red-100 text-red-800';
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
