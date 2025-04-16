import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Add loading/error states if needed later
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    // setError(null);
    // Handle login logic here (e.g., API call)
    console.log('Attempting login with:', { email, password });
    // Simulate API call
    // setTimeout(() => {
    //   setLoading(false);
    //   // Example error handling
    //   // setError("Invalid credentials");
    // }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]"> {/* Adjust min-height based on Navbar height */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <div className="flex justify-center">
          <img
            src="https://linksy.tech/storage/2023/09/LogoLinksyBlank.png"
            alt="Logo"
            className="h-12 w-auto" // Adjust height as needed
          />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        {/* Optional: Display error message */}
        {/* {error && <p className="text-center text-sm text-red-600">{error}</p>} */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Optional: Remember me checkbox */}
              {/* <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label> */}
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              // disabled={loading} // Optional: Disable button while loading
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {/* Optional: Show loading indicator */}
              {/* {loading ? 'Signing in...' : 'Sign in'} */}
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
