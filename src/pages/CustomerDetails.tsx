import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Customer, customersData, getStatusBadgeColor, getTypeBadgeStyle as getTypeBadgeStyleUtil } from '../types/customer'; // Import shared types and data
import { ArrowLeft, Edit3, Save, XCircle, DollarSign, Activity, FileText, ShoppingBag, User, Code, CheckCircle, X, MapPin, File, Briefcase, Hash, Percent, Calendar, Phone, Mail, Home as HomeIcon, Building } from 'lucide-react'; // Import necessary icons

// Helper function to determine badge color and icon for account type (using imported icons)
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

// Reusable component for displaying info fields with optional editing
const InfoField: React.FC<{ label: string; value: React.ReactNode; isEditing: boolean; onEdit?: (newValue: string) => void; inputType?: string }> =
  ({ label, value, isEditing, onEdit, inputType = 'text' }) => {
    const [currentValue, setCurrentValue] = useState(value as string);

    useEffect(() => {
      setCurrentValue(value as string); // Update local state if prop value changes
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCurrentValue(e.target.value);
      if (onEdit) {
        onEdit(e.target.value);
      }
    };

    return (
      <div className="mb-3">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        {isEditing && onEdit ? (
          inputType === 'textarea' ? (
            <textarea
              value={currentValue}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              rows={3}
            />
          ) : (
            <input
              type={inputType}
              value={currentValue}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          )
        ) : (
          <dd className="mt-1 text-sm text-gray-900">{value}</dd>
        )}
      </div>
    );
  };

// Reusable component for stat cards
const StatCardInline: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className={`flex items-center p-3 bg-${color}-50 rounded-lg border border-${color}-200`}>
    <Icon size={20} className={`mr-2 text-${color}-600`} />
    <div>
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);


const CustomerDetails: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Simulate fetching customer data
    const foundCustomer = customersData.find(c => c.id === parseInt(customerId || '0'));
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setEditedCustomer(JSON.parse(JSON.stringify(foundCustomer))); // Deep copy for editing
    } else {
      setCustomer(null); // Handle customer not found
      setEditedCustomer(null);
    }
  }, [customerId]);

  const handleEditToggle = () => {
    if (isEditing && customer) {
      // Reset changes if canceling edit
      setEditedCustomer(JSON.parse(JSON.stringify(customer)));
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Placeholder for save logic (e.g., API call)
    console.log('Saving changes:', editedCustomer);
    if (editedCustomer) {
      setCustomer(editedCustomer); // Update displayed data
      // Find index and update in the main array (for demo purposes)
      const index = customersData.findIndex(c => c.id === editedCustomer.id);
      if (index !== -1) {
        customersData[index] = editedCustomer;
      }
    }
    setIsEditing(false);
    // Add success feedback if needed
  };

  const handleInputChange = (field: keyof Customer, value: string) => {
    if (editedCustomer) {
      setEditedCustomer({ ...editedCustomer, [field]: value });
    }
  };

  if (!customer || !editedCustomer) {
    return (
      <div className="text-center p-10">
        <p className="text-xl text-gray-600">Customer not found.</p>
        <Link to="/customers" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <ArrowLeft size={16} className="mr-2" /> Back to Customer List
        </Link>
      </div>
    );
  }

  const typeStyle = getTypeBadgeStyle(editedCustomer.type);
  const activityStatusColor = getStatusBadgeColor(editedCustomer.activityStatus);
  const accountStatusColor = getStatusBadgeColor(editedCustomer.accountStatus);

  // Placeholder Stats Data
  const stats = {
    paymentsThisMonth: 12,
    activityLastWeek: 45,
    ticketSlots: 3,
    mostPurchasedService: editedCustomer.activeServices?.[0] || 'N/A',
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
           <button
             onClick={() => navigate('/customers')}
             className="mr-4 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
             title="Back to Customer List"
           >
             <ArrowLeft size={20} className="text-gray-600" />
           </button>
          <h1 className="text-2xl font-semibold text-gray-800">Customer Details: {customer.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Save size={16} className="mr-2" /> Save Changes
              </button>
              <button
                onClick={handleEditToggle}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircle size={16} className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Edit3 size={16} className="mr-2" /> Edit Information
            </button>
          )}
        </div>
      </div>

      {/* Basic Stats Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardInline title="Payments (Month)" value={stats.paymentsThisMonth.toString()} icon={DollarSign} color="green" />
          <StatCardInline title="Activity (Week)" value={stats.activityLastWeek.toString()} icon={Activity} color="blue" />
          <StatCardInline title="Ticket Slots" value={stats.ticketSlots.toString()} icon={FileText} color="yellow" />
          <StatCardInline title="Top Service" value={stats.mostPurchasedService} icon={ShoppingBag} color="purple" />
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Account Information Section */}
        <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Account Information</h2>
          <dl>
            <InfoField label="Account Type" isEditing={false} value={
              <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${typeStyle.color}`}>
                {typeStyle.icon}
                {editedCustomer.type}
              </span>
            } />
            <InfoField label="Activity Status" isEditing={false} value={
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activityStatusColor}`}>
                {editedCustomer.activityStatus}
              </span>
            } />
             <InfoField label="Account Status" isEditing={isEditing} onEdit={(val) => handleInputChange('accountStatus', val)} value={
               isEditing ? editedCustomer.accountStatus : (
                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${accountStatusColor}`}>
                   {editedCustomer.accountStatus}
                 </span>
               )
             } />
            <InfoField label="Total Transactions" isEditing={isEditing} onEdit={(val) => handleInputChange('totalTransactions', val)} value={editedCustomer.totalTransactions} />
            <InfoField label="Opening Date" isEditing={false} value={editedCustomer.openingDate} />
            <InfoField label="Authentication Status" isEditing={false} value={
              <span className={`inline-flex items-center text-sm ${editedCustomer.isAuthenticated ? 'text-green-600' : 'text-yellow-600'}`}>
                {editedCustomer.isAuthenticated ? <CheckCircle size={16} className="mr-1" /> : <X size={16} className="mr-1" />}
                {editedCustomer.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </span>
            } />
            <InfoField label="Last Login IP" isEditing={false} value={
              editedCustomer.lastLoginIp ? (
                <span className="inline-flex items-center">
                  <MapPin size={14} className="mr-1 text-gray-500" /> {editedCustomer.lastLoginIp} ({editedCustomer.lastLoginLocation || 'Unknown Location'})
                </span>
              ) : 'N/A'
            } />

            <div className="mb-3">
              <dt className="text-sm font-medium text-gray-500">Uploaded Files</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {editedCustomer.uploadedFiles && editedCustomer.uploadedFiles.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {editedCustomer.uploadedFiles.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 hover:underline inline-flex items-center">
                          <File size={14} className="mr-1" /> {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : 'No files uploaded.'}
              </dd>
            </div>

             <div className="mb-3">
              <dt className="text-sm font-medium text-gray-500">Active Services</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {editedCustomer.activeServices && editedCustomer.activeServices.length > 0 ? (
                   <div className="flex flex-wrap gap-1">
                     {editedCustomer.activeServices.map((service, index) => (
                       <span key={index} className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                         {service}
                       </span>
                     ))}
                   </div>
                ) : 'No active services.'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Client & Company Information Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center"><User size={18} className="mr-2"/>Client Information</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoField label="Full Name" isEditing={isEditing} onEdit={(val) => handleInputChange('name', val)} value={editedCustomer.name} />
              <InfoField label="Email Address" isEditing={isEditing} onEdit={(val) => handleInputChange('email', val)} value={
                <span className="inline-flex items-center">
                  <Mail size={14} className="mr-1 text-gray-500" /> {editedCustomer.email}
                </span>
              } inputType="email" />
              <InfoField label="Phone Number" isEditing={isEditing} onEdit={(val) => handleInputChange('phone', val)} value={
                 <span className="inline-flex items-center">
                  <Phone size={14} className="mr-1 text-gray-500" /> {editedCustomer.phone}
                </span>
              } inputType="tel" />
              <InfoField label="Full Address" isEditing={isEditing} onEdit={(val) => handleInputChange('address', val)} value={
                 <span className="inline-flex items-start">
                  <HomeIcon size={14} className="mr-1 mt-0.5 text-gray-500 flex-shrink-0" /> {editedCustomer.address || 'N/A'}
                </span>
              } inputType="textarea" />
              {editedCustomer.isAuthenticated && (
                <>
                  <InfoField label="Date of Birth" isEditing={isEditing} onEdit={(val) => handleInputChange('dob', val)} value={
                     <span className="inline-flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-500" /> {editedCustomer.dob || 'N/A'}
                    </span>
                  } inputType="date" />
                  <InfoField label="National ID" isEditing={isEditing} onEdit={(val) => handleInputChange('nationalId', val)} value={editedCustomer.nationalId || 'N/A'} />
                </>
              )}
            </dl>
          </div>

          {/* Company Information Section (Conditional) */}
          {editedCustomer.isCompanyAccount && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center"><Building size={18} className="mr-2"/>Company Information</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InfoField label="Company Name" isEditing={isEditing} onEdit={(val) => handleInputChange('company', val)} value={editedCustomer.company || 'N/A'} />
                <InfoField label="Commercial Reg. No." isEditing={isEditing} onEdit={(val) => handleInputChange('companyRegNumber', val)} value={
                  <span className="inline-flex items-center">
                    <Briefcase size={14} className="mr-1 text-gray-500" /> {editedCustomer.companyRegNumber || 'N/A'}
                  </span>
                } />
                <InfoField label="Tax Number" isEditing={isEditing} onEdit={(val) => handleInputChange('taxNumber', val)} value={
                  <span className="inline-flex items-center">
                    <Percent size={14} className="mr-1 text-gray-500" /> {editedCustomer.taxNumber || 'N/A'}
                  </span>
                } />
                <InfoField label="Statistics Number" isEditing={isEditing} onEdit={(val) => handleInputChange('statsNumber', val)} value={
                  <span className="inline-flex items-center">
                    <Hash size={14} className="mr-1 text-gray-500" /> {editedCustomer.statsNumber || 'N/A'}
                  </span>
                } />
                 <InfoField label="Company Address" isEditing={isEditing} onEdit={(val) => handleInputChange('companyAddress', val)} value={
                   <span className="inline-flex items-start">
                    <HomeIcon size={14} className="mr-1 mt-0.5 text-gray-500 flex-shrink-0" /> {editedCustomer.companyAddress || 'N/A'}
                  </span>
                 } inputType="textarea" />
              </dl>
            </div>
          )}
        </div>
      </div>
       {/* Tailwind Color Safelister - Include colors used dynamically or potentially purged */}
       <div className="hidden">
         <span className="bg-green-50 border-green-200 text-green-600"></span>
         <span className="bg-blue-50 border-blue-200 text-blue-600"></span>
         <span className="bg-yellow-50 border-yellow-200 text-yellow-600"></span>
         <span className="bg-purple-50 border-purple-200 text-purple-600"></span>
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

export default CustomerDetails;
