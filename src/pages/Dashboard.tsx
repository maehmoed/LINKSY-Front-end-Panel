import React from 'react';
import { Users, ShoppingCart, DollarSign, Activity } from 'lucide-react'; // Example icons

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};


const Dashboard: React.FC = () => {
  // Placeholder data - replace with actual data fetching later
  // Updated Revenue format
  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
    { title: 'Revenue', value: '56 789 DA', icon: DollarSign, color: 'green' }, // Updated format
    { title: 'Orders', value: '580', icon: ShoppingCart, color: 'yellow' },
    { title: 'Activity Rate', value: '75%', icon: Activity, color: 'red' }, // Using red from theme
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            // Note: Tailwind needs full class names, dynamic concatenation might not work reliably for bg/text colors without safelisting.
            // Using a fixed color here for demonstration, or adjust StatCard to accept className strings.
            // For the red theme color, we can use it directly.
            color={stat.color === 'red' ? 'red' : stat.color} // Example: Use red for 'Activity Rate'
          />
        ))}
      </div>

      {/* Placeholder for Charts or Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Performance Chart</h2>
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">[Chart Placeholder]</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full"><Users size={16} className="text-blue-600"/></div>
              <p className="text-sm text-gray-600">New user registered: John Doe</p>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full"><DollarSign size={16} className="text-green-600"/></div>
              {/* Updated payment format */}
              <p className="text-sm text-gray-600">Payment received: 250 DA</p>
            </li>
             <li className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-full"><ShoppingCart size={16} className="text-yellow-600"/></div>
              <p className="text-sm text-gray-600">New order placed: #12345</p>
            </li>
             <li className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-full"><Activity size={16} className="text-red-600"/></div>
              <p className="text-sm text-gray-600">Server alert: High CPU usage</p>
            </li>
          </ul>
           <button className="mt-4 w-full text-sm text-red-600 hover:text-red-800 font-medium">
             View All Activity
           </button>
        </div>
      </div>

    </div>
  );
};

// Tailwind needs these classes to exist explicitly for purging, especially when dynamically constructed.
// Add dummy elements or configure safelisting if needed for dynamic colors like bg-blue-100, text-blue-600 etc.
const TailwindColorSafelister = () => (
  <div>
    <span className="bg-blue-100 text-blue-600"></span>
    <span className="bg-green-100 text-green-600"></span>
    <span className="bg-yellow-100 text-yellow-600"></span>
    <span className="bg-red-100 text-red-600"></span> {/* Already used */}
  </div>
);


export default Dashboard;
