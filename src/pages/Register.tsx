import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Utensils, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 relative">
      <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white bg-white dark:bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 transition-all z-50">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
        
        {/* Left Side - Image/Info */}
        <div className="bg-primary-900 text-white p-12 flex-col justify-between hidden md:flex relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-800 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat mix-blend-overlay"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-700 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <Utensils className="w-8 h-8" />
              <span className="font-bold text-2xl tracking-tight">ZPHS Arilova</span>
            </Link>
          </div>
          
          <div className="relative z-10 mt-10">
            <h2 className="text-4xl font-bold mb-6 leading-tight">Join the network across your schools.</h2>
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

        {/* Right Side - Register Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center md:text-left relative">
                <div className="inline-flex md:hidden items-center gap-2 text-primary-800 mb-6 mt-6">
                  <Utensils className="w-6 h-6" />
                  <span className="font-bold text-xl tracking-tight">ZPHS Arilova</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 mt-4 md:mt-0">Create account</h1>
                <p className="text-slate-500 dark:text-slate-400">Please fill in your details to sign up.</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="First Name"
                    placeholder="John"
                    type="text"
                    required
                  />
                  <Input 
                    label="Last Name"
                    placeholder="Doe"
                    type="text"
                    required
                  />
                </div>
                
                <Input 
                  label="School Code"
                  placeholder="e.g. 10012"
                  type="text"
                  required
                />
                
                <div className="relative">
                  <Input 
                    label="Password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 dark:text-slate-400 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full text-base h-12 mt-6 relative overflow-hidden group"
                >
                  <span className={cn("transition-all duration-300 flex items-center justify-center gap-2", isLoading ? "-translate-y-12 opacity-0" : "translate-y-0 opacity-100")}>
                    Sign up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className={cn("absolute inset-0 flex items-center justify-center transition-all duration-300", isLoading ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0")}>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </span>
                </Button>
              </form>
              
              <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>Already have an account? <Link to="/login" className="font-medium text-primary-700 hover:text-primary-800">Sign in</Link></p>
              </div>
            </motion.div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
