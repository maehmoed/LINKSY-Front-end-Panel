import React, { useState, useMemo } from 'react';
import { Settings, User, Code, Search, Filter, X, PlusCircle } from 'lucide-react'; // Import User, Code, Search, Filter, X, PlusCircle icons
import { useNavigate } from 'react-router-dom';
import { Customer, customersData, getStatusBadgeColor } from '../types/customer'; // Import shared types and data

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

// Get unique values for filters
const accountStatuses = ['All', ...Array.from(new Set(customersData.map(c => c.accountStatus)))];
const accountTypes = ['All', ...Array.from(new Set(customersData.map(c => c.type)))];


const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Customer['accountStatus'] | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<Customer['type'] | 'All'>('All');

  // Function to handle navigation to customer details
  const handleViewDetails = (customerId: number) => {
    navigate(`/customers/${customerId}`);
  };

  // Placeholder for adding a customer
  const handleAddCustomer = () => {
    console.log("Add Customer button clicked");
    // Future implementation: navigate('/customers/new') or open a modal
  };

  // Filtered Customers Logic
  const filteredCustomers = useMemo(() => {
    return customersData.filter(customer => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        customer.name.toLowerCase().includes(lowerSearchTerm) ||
        (customer.company && customer.company.toLowerCase().includes(lowerSearchTerm)) ||
        customer.email.toLowerCase().includes(lowerSearchTerm) ||
        customer.phone.toLowerCase().includes(lowerSearchTerm);

      const matchesStatus = statusFilter === 'All' || customer.accountStatus === statusFilter;
      const matchesType = typeFilter === 'All' || customer.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      {/* Header Row: Title, Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Customer Management</h1>
        <button
          onClick={handleAddCustomer}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <PlusCircle size={16} className="mr-2" /> Add Customer
        </button>
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name, company, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm w-full"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Customer['accountStatus'] | 'All')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            title="Filter by Account Status"
          >
            {accountStatuses.map(status => (
              <option key={status} value={status}>{status === 'All' ? 'All Statuses' : status}</option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as Customer['type'] | 'All')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            title="Filter by Account Type"
          >
             {accountTypes.map(type => (
              <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
            ))}
          </select>
          <button
            onClick={() => { setSearchTerm(''); setStatusFilter('All'); setTypeFilter('All'); }}
            className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            title="Clear Filters"
          >
            <X size={18} className="text-gray-600"/>
          </button>
        </div>
      </div>

      {/* Customer Table */}
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => {
                const typeStyle = getTypeBadgeStyle(customer.type);
                return (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.company ?? 'N/A'}</td>
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
                        onClick={() => handleViewDetails(customer.id)}
                        className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        title="View Customer Details"
                      >
                        <Settings size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-4 text-center text-sm text-gray-500">
                  No customers found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Tailwind Color Safelister */}
       <div className="hidden">
         <span className="bg-green-100 text-green-800"></span>
         <span className="bg-yellow-100 text-yellow-800"></span>
         <span className="bg-red-100 text-red-800"></span>
         <span className="bg-blue-100 text-blue-800"></span>
         <span className="bg-purple-100 text-purple-800"></span>
         <span className="bg-gray-100 text-gray-800"></span>
       </div>
    </div>
  );
};

export default CustomerManagement;
