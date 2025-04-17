import React from 'react';
import { Settings, User, Code } from 'lucide-react'; // Import User and Code icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Customer, customersData, getStatusBadgeColor, getTypeBadgeStyle as getTypeBadgeStyleUtil } from '../types/customer'; // Import shared types and data

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
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle navigation to customer details
  const handleViewDetails = (customerId: number) => {
    navigate(`/customers/${customerId}`);
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th> {/* Changed Settings to Details */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customersData.map((customer) => { // Use imported data
              const typeStyle = getTypeBadgeStyle(customer.type);
              return (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.company ?? 'N/A'}</td> {/* Handle optional company */}
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
                      onClick={() => handleViewDetails(customer.id)} // Use handler to navigate
                      className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      title="View Customer Details" // Updated title
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
