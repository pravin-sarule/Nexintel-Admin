// import React, { useState } from 'react';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Email:', email, 'Password:', password);
//     alert('Login functionality to be implemented.');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center" onSubmit={handleSubmit}>
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Login</h2>
//         <div className="mb-4 text-left">
//           <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-6 text-left">
//           <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       console.log('Email:', email, 'Password:', password);
//       alert('Login functionality to be implemented.');
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen w-full relative">
//       {/* Animated Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute inset-0" style={{
//             backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)',
//             backgroundSize: '40px 40px'
//           }}></div>
//         </div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
//       <div className="absolute top-1/4 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce"></div>
//       <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

//       {/* Main Content */}
//       <div className="relative z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8">
//         <div className="w-full max-w-md">
//           {/* Glassmorphism Card */}
//           <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 transform hover:scale-105 transition-all duration-300">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
//                 <User className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
//                 Welcome Back
//               </h2>
//               <p className="text-white/70 text-sm sm:text-base">
//                 Sign in to your admin account
//               </p>
//             </div>

//             <div className="space-y-6">
//               {/* Email Field */}
//               <div className="group">
//                 <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2 transition-colors group-focus-within:text-white">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="block w-full pl-10 pr-3 py-3 sm:py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/20"
//                     placeholder="admin@example.com"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="group">
//                 <label htmlFor="password" className="block text-white/90 text-sm font-medium mb-2 transition-colors group-focus-within:text-white">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="block w-full pl-10 pr-12 py-3 sm:py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/20"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70 transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500 focus:ring-2"
//                   />
//                   <span className="ml-2 text-white/70 hover:text-white transition-colors">
//                     Remember me
//                   </span>
//                 </label>
//                 <a
//                   href="#"
//                   className="text-purple-300 hover:text-purple-100 transition-colors font-medium"
//                 >
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 onClick={handleSubmit}
//                 className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="mt-8 pt-6 border-t border-white/10">
//               <p className="text-center text-white/60 text-sm">
//                 Don't have an account?{' '}
//                 <a
//                   href="#"
//                   className="text-purple-300 hover:text-purple-100 transition-colors font-medium"
//                 >
//                   Contact Administrator
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Email:', email, 'Password:', password);
      alert('Login functionality to be implemented.');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/4 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 transform hover:scale-105 transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-white/70 text-sm sm:text-base">
                Sign in to your admin account
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2 transition-colors group-focus-within:text-white">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-9 sm:pl-10 pr-3 py-3 sm:py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 text-sm sm:text-base"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-white/90 text-sm font-medium mb-2 transition-colors group-focus-within:text-white">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-9 sm:pl-10 pr-11 sm:pr-12 py-3 sm:py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 text-sm sm:text-base"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 bg-white/10 border border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="ml-2 text-white/70 hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-purple-300 hover:text-purple-100 transition-colors font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent mr-2 sm:mr-3"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
              <p className="text-center text-white/60 text-xs sm:text-sm">
                Don't have an account?{' '}
                <a
                  href="#"
                  className="text-purple-300 hover:text-purple-100 transition-colors font-medium"
                >
                  Contact Administrator
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;