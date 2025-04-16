import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  FileText,
  Activity,
  BarChart2,
  PieChart,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Globe,
  Edit2,
  Briefcase,
  Hash,
  TrendingUp,
  Ticket,
  Server,
  UploadCloud,
  Code, // Added Code icon
  List, // Added List icon for Number of Services
} from 'lucide-react';

// Define a more detailed type for customer details
type CustomerDetailsData = {
  id: number;
  // Client Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob?: string; // Optional: Date of Birth
  nationalId?: string; // Optional: National ID
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  // Account Info
  accountType: 'Developer Account' | 'Regular Account';
  activityStatus: 'Active' | 'Inactive';
  accountStatus: 'Activated' | 'Deactivated' | 'Blocked' | 'Subscribed' | 'Unsubscribed';
  authenticationStatus: 'Verified' | 'Not Verified';
  totalTransactions: string;
  openingDate: string;
  lastLoginIp: string;
  lastLoginLocation: string;
  uploadedFiles: { name: string; url: string }[];
  activeServices: { id: string; name: string; activationDate: string }[];
  // Company Info (Optional)
  company?: {
    name: string;
    registrationNumber: string;
    taxNumber: string;
    statsNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
    };
  };
  // Placeholder Stats Data (replace with actual data structures later)
  stats: {
    // Keep graph placeholders if needed elsewhere, or remove if only line stats are used
    paymentsPerMonth: any[];
    activityLastWeek: any[];
    ticketsPerService: any[];
    popularServices: any[];
    // Add specific line stats placeholders
    paymentsLastMonth: number;
    activityCasesLastMonth: number;
    ticketsOpenedLastMonth: number;
    // numberOfServices is derived from activeServices.length
  };
};

// Placeholder data - replace with actual data fetching based on customerId
const getCustomerDetails = (id: number): CustomerDetailsData | null => {
  // In a real app, fetch data based on id
  if (id === 2) { // Example: Bob The Builder (Developer Account with Company)
    const activeServices = [
      { id: 'SVC001', name: 'Premium API Access', activationDate: '2023-01-01' },
      { id: 'SVC005', name: 'Cloud Storage 1TB', activationDate: '2023-02-15' },
    ];
    return {
      id: 2,
      firstName: 'Bob',
      lastName: 'The Builder',
      email: 'bob@buildit.dev',
      phone: '+1-555-5678',
      dob: '1980-05-15',
      nationalId: 'XYZ123456',
      address: { street: '123 Construction Ave', city: 'Builderville', state: 'CA', country: 'USA', zip: '90210' },
      accountType: 'Developer Account',
      activityStatus: 'Active',
      accountStatus: 'Subscribed',
      authenticationStatus: 'Verified',
      totalTransactions: '250 000 DA',
      openingDate: '2022-11-01',
      lastLoginIp: '192.168.1.100',
      lastLoginLocation: 'Builderville, CA, USA',
      uploadedFiles: [
        { name: 'id_scan.pdf', url: '#' },
        { name: 'proof_of_address.jpg', url: '#' },
      ],
      activeServices: activeServices,
      company: {
        name: 'BuildIt Co.',
        registrationNumber: 'C1234567',
        taxNumber: 'T9876543',
        statsNumber: 'S1122334',
        address: { street: '456 Enterprise Rd', city: 'Builderville', state: 'CA', country: 'USA', zip: '90211' },
      },
      stats: {
        paymentsPerMonth: [],
        activityLastWeek: [],
        ticketsPerService: [],
        popularServices: [],
        // Placeholder line stats
        paymentsLastMonth: 12,
        activityCasesLastMonth: 5,
        ticketsOpenedLastMonth: 2,
      },
    };
  }
   if (id === 1) { // Example: Alice Wonderland (Regular Account without Company)
     const activeServices = [
         { id: 'SVC002', name: 'Basic Support', activationDate: '2023-01-15' },
      ];
    return {
      id: 1,
      firstName: 'Alice',
      lastName: 'Wonderland',
      email: 'alice@wonder.com',
      phone: '+1-555-1234',
      // dob: undefined, // Not verified
      // nationalId: undefined, // Not verified
      address: { street: 'Rabbit Hole Lane', city: 'Fantasy City', state: 'FS', country: 'ImagiNation', zip: '10001' },
      accountType: 'Regular Account',
      activityStatus: 'Active',
      accountStatus: 'Activated',
      authenticationStatus: 'Not Verified',
      totalTransactions: '15 000 DA',
      openingDate: '2023-01-15',
      lastLoginIp: '10.0.0.5',
      lastLoginLocation: 'Fantasy City, FS, ImagiNation',
      uploadedFiles: [],
      activeServices: activeServices,
      // company: undefined, // No company info
      stats: {
        paymentsPerMonth: [],
        activityLastWeek: [],
        ticketsPerService: [],
        popularServices: [],
         // Placeholder line stats
        paymentsLastMonth: 3,
        activityCasesLastMonth: 1,
        ticketsOpenedLastMonth: 0,
      },
    };
  }
  return null; // Customer not found
};

// Helper component for displaying info sections
const InfoSection: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; onEdit?: () => void }> = ({ title, icon: Icon, children, onEdit }) => (
  <div className="bg-white p-6 rounded-lg shadow mb-6 relative">
    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
      <Icon className="mr-2 text-red-600" size={20} />
      {title}
    </h3>
    {onEdit && (
       <button
         onClick={onEdit}
         className="absolute top-4 right-4 text-gray-400 hover:text-red-600 focus:outline-none"
         title={`Edit ${title}`}
       >
         <Edit2 size={18} />
       </button>
    )}
    <div className="space-y-3 text-sm text-gray-600">
      {children}
    </div>
  </div>
);

// Helper component for displaying individual info items
const InfoItem: React.FC<{ label: string; value?: string | React.ReactNode; icon?: React.ElementType }> = ({ label, value, icon: Icon }) => (
  <div className="flex items-start">
    {Icon && <Icon className="mr-2 mt-0.5 text-gray-400 flex-shrink-0" size={16} />}
    <span className="font-medium text-gray-800 w-40 flex-shrink-0">{label}:</span>
    <span className="text-gray-600 break-words">{value || 'N/A'}</span>
  </div>
);

// Helper for status badges
const StatusBadge: React.FC<{ status: string; type: 'activity' | 'account' | 'auth' }> = ({ status, type }) => {
  let colorClasses = 'bg-gray-100 text-gray-800';
  let Icon = AlertCircle;

  if (type === 'activity') {
    if (status === 'Active') { colorClasses = 'bg-green-100 text-green-800'; Icon = CheckCircle; }
    if (status === 'Inactive') { colorClasses = 'bg-yellow-100 text-yellow-800'; Icon = Clock; }
  } else if (type === 'account') {
    if (['Activated', 'Subscribed'].includes(status)) { colorClasses = 'bg-green-100 text-green-800'; Icon = CheckCircle; }
    if (['Unsubscribed'].includes(status)) { colorClasses = 'bg-yellow-100 text-yellow-800'; Icon = AlertCircle; }
    if (['Deactivated', 'Blocked'].includes(status)) { colorClasses = 'bg-red-100 text-red-800'; Icon = XCircle; }
  } else if (type === 'auth') {
     if (status === 'Verified') { colorClasses = 'bg-blue-100 text-blue-800'; Icon = CheckCircle; }
     if (status === 'Not Verified') { colorClasses = 'bg-gray-100 text-gray-800'; Icon = AlertCircle; }
  }

  return (
    <span className={`px-2 py-0.5 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${colorClasses}`}>
      <Icon size={12} className="mr-1" />
      {status}
    </span>
  );
};

// Helper for Address Tag
const AddressTag: React.FC<{ address: CustomerDetailsData['address'] | CustomerDetailsData['company']['address'], title: string }> = ({ address, title }) => (
  <div>
    <span className="font-medium text-gray-800">{title}:</span>
    <div className="ml-4 mt-1 p-2 border border-gray-200 rounded bg-gray-50 text-xs">
      <div>{address.street}</div>
      <div>{address.city}, {address.state} {address.zip}</div>
      <div>{address.country}</div>
    </div>
  </div>
);

// Helper for individual stat item in the redesigned stats section
const StatItem: React.FC<{ icon: React.ElementType; label: string; value: string | number; colorClass: string }> = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded border border-gray-200 flex-1 min-w-[150px] mx-1">
    <Icon size={20} className={`mr-3 ${colorClass}`} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);


const CustomerDetails: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const customer = getCustomerDetails(Number(customerId));

  if (!customer) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">Customer not found</h2>
        <button onClick={() => navigate('/customers')} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Back to Customers
        </button>
      </div>
    );
  }

  const handleEdit = (section: string) => {
    alert(`Edit functionality for ${section} is not implemented yet.`);
    // Later, this would open a modal or navigate to an edit form
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Customer Details: {customer.firstName} {customer.lastName}
      </h1>

      {/* Redesigned Stats Section - Single Line */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
         <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
           <TrendingUp className="mr-2 text-red-600" size={18} />
           Quick Stats (Last Month)
         </h3>
         <div className="flex flex-wrap justify-around items-center gap-2">
            <StatItem
              icon={CreditCard}
              label="Payments"
              value={customer.stats.paymentsLastMonth}
              colorClass="text-blue-500"
            />
             <StatItem
              icon={Activity}
              label="Activity Cases"
              value={customer.stats.activityCasesLastMonth}
              colorClass="text-green-500"
            />
             <StatItem
              icon={Ticket}
              label="Tickets Opened"
              value={customer.stats.ticketsOpenedLastMonth}
              colorClass="text-yellow-500"
            />
             <StatItem
              icon={List} // Using List icon for number of services
              label="Active Services"
              value={customer.activeServices.length} // Calculate from activeServices array
              colorClass="text-purple-500"
            />
         </div>
      </div>


      {/* Account Information */}
      <InfoSection title="Account Information" icon={Settings} onEdit={() => handleEdit('Account Information')}>
        <InfoItem label="Account Type" value={customer.accountType} icon={customer.accountType === 'Developer Account' ? Code : User} />
        <InfoItem label="Activity Status" value={<StatusBadge status={customer.activityStatus} type="activity" />} />
        <InfoItem label="Account Status" value={<StatusBadge status={customer.accountStatus} type="account" />} />
        <InfoItem label="Authentication" value={<StatusBadge status={customer.authenticationStatus} type="auth" />} />
        <InfoItem label="Total Transactions" value={customer.totalTransactions} icon={CreditCard} />
        <InfoItem label="Opening Date" value={customer.openingDate} icon={Calendar} />
        <InfoItem label="Last Login IP" value={`${customer.lastLoginIp} (${customer.lastLoginLocation})`} icon={Globe} />

        {/* Files Uploaded */}
        <div className="pt-2">
           <h4 className="font-medium text-gray-800 mb-1 flex items-center"><UploadCloud size={16} className="mr-2 text-gray-400"/>Uploaded Files:</h4>
           {customer.uploadedFiles.length > 0 ? (
             <ul className="list-disc list-inside space-y-1 pl-4">
               {customer.uploadedFiles.map(file => (
                 <li key={file.name}>
                   <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">{file.name}</a>
                 </li>
               ))}
             </ul>
           ) : (
             <p className="text-gray-500 italic pl-4">No files uploaded.</p>
           )}
        </div>

         {/* Active Services */}
        <div className="pt-2">
           <h4 className="font-medium text-gray-800 mb-1 flex items-center"><Server size={16} className="mr-2 text-gray-400"/>Active Services:</h4>
           {customer.activeServices.length > 0 ? (
             <ul className="list-disc list-inside space-y-1 pl-4">
               {customer.activeServices.map(service => (
                 <li key={service.id}>
                   {service.name} (Activated: {service.activationDate})
                 </li>
               ))}
             </ul>
           ) : (
             <p className="text-gray-500 italic pl-4">No active services.</p>
           )}
        </div>
      </InfoSection>

      {/* Client Information */}
      <InfoSection title="Client Information" icon={User} onEdit={() => handleEdit('Client Information')}>
        <InfoItem label="Full Name" value={`${customer.firstName} ${customer.lastName}`} />
        <InfoItem label="Email" value={customer.email} icon={Mail} />
        <InfoItem label="Phone" value={customer.phone} icon={Phone} />
        <InfoItem label="Date of Birth" value={customer.dob} icon={Calendar} />
        <InfoItem label="National ID" value={customer.nationalId} icon={FileText} />
        <AddressTag address={customer.address} title="Client Address"/>
      </InfoSection>

      {/* Company Information (Conditional) */}
      {customer.company && (
        <InfoSection title="Company Information" icon={Building} onEdit={() => handleEdit('Company Information')}>
          <InfoItem label="Company Name" value={customer.company.name} icon={Briefcase}/>
          <InfoItem label="Registration #" value={customer.company.registrationNumber} icon={Hash}/>
          <InfoItem label="Tax #" value={customer.company.taxNumber} icon={Hash}/>
          <InfoItem label="Statistics #" value={customer.company.statsNumber} icon={Hash}/>
          <AddressTag address={customer.company.address} title="Company Address"/>
        </InfoSection>
      )}

       <button onClick={() => navigate('/customers')} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Back to Customers List
       </button>
    </div>
  );
};

export default CustomerDetails;
