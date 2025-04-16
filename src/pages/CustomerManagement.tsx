import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Settings, User, Code } from 'lucide-react';

// Define a type for customer data for better type safety
type Customer = {
  id: number;
  name: string;
  company: string;
  type: 'Developer Account' | 'Regular Account';
  email: string;
  phone: string;
  activityStatus: 'Active' | 'Inactive';
  accountStatus: 'Activated' | 'Deactivated' | 'Blocked' | 'Subscribed' | 'Unsubscribed';
  totalTransactions: string; // Using string to include 'DA'
  openingDate: string; // Format as needed, e.g., 'YYYY-MM-DD'
};

// Placeholder data - replace with actual data fetching later
const customers: Customer[] = [
  { id: 1, name: 'Alice Wonderland', company: 'Wonder Industries', type: 'Regular Account', email: 'alice@wonder.com', phone: '+1-555-1234', activityStatus: 'Active', accountStatus: 'Activated', totalTransactions: '15 000 DA', openingDate: '2023-01-15' },
  { id: 2, name: 'Bob The Builder', company: 'BuildIt Co.', type: 'Developer Account', email: 'bob@buildit.dev', phone: '+1-555-5678', activityStatus: 'Active', accountStatus: 'Subscribed', totalTransactions: '250 000 DA', openingDate: '2022-11-01' },
  { id: 3, name: 'Charlie Chaplin', company: 'Silent Films Ltd.', type: 'Regular Account', email: 'charlie@silent.org', phone: '+1-555-9012', activityStatus: 'Inactive', accountStatus: 'Unsubscribed', totalTransactions: '5 000 DA', openingDate: '2023-05-20' },
  { id: 4, name: 'Diana Prince', company: 'Themyscira Exports', type: 'Regular Account', email: 'diana@themyscira.com', phone: '+1-555-3456', activityStatus: 'Active', accountStatus: 'Blocked', totalTransactions: '500 DA', openingDate: '2024-01-10' },
  { id: 5, name: 'Ethan Hunt', company: 'IMF Services', type: 'Developer Account', email: 'ethan@imf.gov', phone: '+1-555-7890', activityStatus: 'Active', accountStatus: 'Activated', totalTransactions: '1 200 000 DA', openingDate: '2021-08-30' },
];

// Helper function to determine badge color based on status
const getStatusBadgeColor = (status: Customer['accountStatus'] | Customer['activityStatus']): string => {
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

// Helper function to determine badge color and icon for account type
const getTypeBadgeStyle = (type: Customer['type']): { color: string; icon: React.ReactNode } => {
  switch (type) {
    case 'Developer Account':
      return { color: 'bg-blue-100 text-blue-800', icon: <Code size={14} className="mr-1" /> };
    case 'Regular Account':
      return { color: 'bg-purple-100 text-purple-800', icon: <User size={14} className="mr-1" /> };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: null };
  }
};


const CustomerManagement: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleViewDetails = (customerId: number) => {
    navigate(`/customers/${customerId}`); // Navigate to the details page
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Transactions</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th> {/* Changed Header */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => {
              const typeStyle = getTypeBadgeStyle(customer.type);
              return (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${typeStyle.color}`}>
                      {typeStyle.icon}
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(customer.activityStatus)}`}>
                      {customer.activityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(customer.accountStatus)}`}>
                      {customer.accountStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.totalTransactions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.openingDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(customer.id)} // Updated onClick handler
                      className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      title={`View Details for ${customer.name}`} // Updated title
                    >
                      <Settings size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement;
