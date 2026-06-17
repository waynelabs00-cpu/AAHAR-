import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Utensils, ArrowLeft, GraduationCap, School } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'selection' | 'student' | 'school'>('selection');
  const navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard/stock');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      sessionStorage.setItem('desiredRole', loginType === 'student' ? 'student' : 'staff');
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:bg-slate-950 flex items-center justify-center p-4 relative">
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <Link to="/">
          <Button variant="outline" className="gap-2 rounded-full bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:text-white dark:hover:text-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl dark:shadow-black/50 border border-slate-100 dark:border-slate-800 min-h-[600px]">
        
        {/* Left Side - Image/Info */}
        <div className="bg-primary-900 text-white p-12 flex-col justify-between hidden lg:flex relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-800 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-700 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <Utensils className="w-8 h-8" />
              <span className="font-bold text-2xl tracking-tight">ZPHS Arilova</span>
            </Link>
          </div>
          
          <div className="relative z-10 mt-20">
            <h2 className="text-4xl font-bold mb-6 leading-tight">Z.P. High School, Arilova | Administration Portal</h2>
            <p className="text-primary-100 text-lg mb-8">
              A comprehensive platform designed for government school administration to track attendance, monitor inventory, and ensure no student goes hungry.
            </p>
            
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-primary-900 object-cover" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                ))}
              </div>
              <p className="text-sm font-medium text-primary-50">Trusted by 10,000+ principals & coordinators.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto">
            {loginType === 'selection' ? (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
                 className="flex flex-col space-y-6"
               >
                 <div className="text-center md:text-left mb-6">
                   <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Select Login Type</h1>
                   <p className="text-slate-500 dark:text-slate-400">Choose how you want to access ZPHS Arilova portal.</p>
                 </div>
                 
                 <Button 
                   variant="outline" 
                   onClick={() => setLoginType('student')}
                   className="h-auto py-6 px-5 w-full flex items-center justify-start rounded-lg hover:bg-primary-50 dark:bg-primary-900/20 dark:hover:bg-slate-800 transition-all border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 dark:bg-slate-900"
                 >
                   <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400 mr-4">
                     <GraduationCap className="w-6 h-6" />
                   </div>
                   <div className="text-left flex-1 min-w-0">
                     <h3 className="font-semibold text-lg text-slate-900 dark:text-white truncate whitespace-normal">Student Login</h3>
                     <p className="text-sm text-slate-500 dark:text-slate-400 font-normal whitespace-normal line-clamp-2">View your attendance, meals, and raise complaints</p>
                   </div>
                 </Button>

                 <Button 
                   variant="outline"
                   onClick={() => setLoginType('school')}
                   className="h-auto py-6 px-5 w-full flex items-center justify-start rounded-lg hover:bg-primary-50 dark:bg-primary-900/20 dark:hover:bg-slate-800 transition-all border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 dark:bg-slate-900"
                 >
                   <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400 mr-4">
                     <School className="w-6 h-6" />
                   </div>
                   <div className="text-left flex-1 min-w-0">
                     <h3 className="font-semibold text-lg text-slate-900 dark:text-white truncate whitespace-normal">School / Admin Login</h3>
                     <p className="text-sm text-slate-500 dark:text-slate-400 font-normal whitespace-normal line-clamp-2">Manage operations or create a new school account</p>
                   </div>
                 </Button>
               </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8 text-center md:text-left relative">
                  <button 
                    onClick={() => setLoginType('selection')} 
                    className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Login Type
                  </button>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {loginType === 'student' ? 'Student Login' : 'School Administration'}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">Sign in securely using Google Auth.</p>
                </div>

                <div className="space-y-5">
                  <Button 
                    onClick={handleGoogleLogin} 
                    disabled={isLoading}
                    className="w-full text-base h-12 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 relative overflow-hidden group shadow-sm"
                    variant="outline"
                  >
                    <span className={cn("transition-all duration-300 flex items-center justify-center gap-3", isLoading ? "-translate-y-12 opacity-0" : "translate-y-0 opacity-100")}>
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                      Sign in with Google
                    </span>
                    <span className={cn("absolute inset-0 flex items-center justify-center transition-all duration-300", isLoading ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0")}>
                      <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
