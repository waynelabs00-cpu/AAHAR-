import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, Users, BarChart3, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronRight, Clock, Search, PackageSearch,
  Sun, Moon
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { motion } from 'motion/react';
import regeneratedImage from '../assets/images/regenerated_image_1781216722785.jpg';

export default function LandingPage() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white selection:bg-primary-200 selection:text-primary-900 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-primary-800 dark:selection:text-primary-100">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 bg-white dark:bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-primary-800 dark:text-primary-500 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Utensils className="w-7 h-7 text-primary-600 dark:text-primary-500" />
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
              <span className="truncate">ZPHS Arilova</span> 
              <span className="hidden sm:inline whitespace-nowrap ml-1 max-w-[150px] md:max-w-none truncate">- Mid DayMealsManagement</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400 dark:text-slate-300">
            <a href="#features" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">How it Works</a>
            <a href="#stats" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:text-white dark:hover:text-white hidden sm:block">
              Admin Login
            </Link>
            <Link to="/login">
              <Button className="rounded-full shadow-md hover:shadow-lg">
                Portal Access
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary-50 dark:from-slate-900 to-transparent pointer-events-none -z-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 dark:bg-primary-900/40 rounded-full blur-[100px] opacity-60 pointer-events-none -z-10"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-orange-200 dark:bg-orange-900/30 rounded-full blur-[80px] opacity-40 pointer-events-none -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400 dark:text-slate-300 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-50 dark:bg-primary-900/200 animate-pulse"></span>
              Z.P. High School, Arilova | Administration Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
              Ensure every child <br className="hidden md:block" />
              gets a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600">healthy meal.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              A modern, end-to-end administration platform to manage student attendance, track food stock, and streamline midday meal distribution in government schools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" className="rounded-full w-full text-base h-14 px-8 shadow-xl shadow-primary-900/10">
                  Open Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { label: "Schools Connected", value: "10,000+" },
               { label: "Meals Tracked Daily", value: "2.5M" },
               { label: "Data Accuracy", value: "99.9%" },
               { label: "Food Waste Reduced", value: "40%" },
             ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
            >
              Everything you need to manage meals effectively.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-lg text-slate-500 dark:text-slate-400"
            >
              Replace paper registers and fragmented spreadsheets with a single, reliable platform built for scale.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Student Management",
                desc: "Centralized database for all registered students. Track profile details, classes, and meal eligibilities with advanced filters.",
                path: "/dashboard/students"
              },
              {
                icon: Clock,
                title: "Daily Attendance",
                desc: "One-click attendance tracking. Instantly calculate required meal portions based on real-time present student count.",
                path: "/dashboard/attendance"
              },
              {
                icon: PackageSearch,
                title: "Stock Inventory",
                desc: "Monitor raw materials like rice, dal, and vegetables. Receive automated alerts when stock drops below designated thresholds.",
                path: "/dashboard/stock"
              },
              {
                icon: Utensils,
                title: "Meal Distribution",
                desc: "Log daily meals served, track remaining portions, and maintain a complete historical audit trail for compliance.",
                path: "/dashboard/meals"
              },
              {
                icon: BarChart3,
                title: "Advanced Reports",
                desc: "Generate visually rich daily, weekly, or monthly reports. Export to PDF with one click for official submissions.",
                path: "/dashboard/reports"
              },
              {
                icon: ShieldCheck,
                title: "Role-based Access",
                desc: "Secure logins for Principals, Coordinators, and District Admins. Granular permissions ensure data integrity.",
                path: "/dashboard/users"
              }
            ].map((feature, i) => (
              <Link to={feature.path} key={i} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-slate-800/50 transition-shadow group h-full cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                    {feature.title}
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Streamlined workflow for <br/>every school day.</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                The platform follows the natural rhythm of a school day, making administration feel effortless, not like a chore.
              </p>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Morning Attendance", desc: "Teachers mark attendance. System calculates required meals instantly." },
                  { step: "02", title: "Stock Verification", desc: "Kitchen staff reviews available stock against calculated requirements." },
                  { step: "03", title: "Distribution Logging", desc: "Meals served are verified and logged post-lunch period." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 text-3xl font-bold text-primary-500/50">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="aspect-square rounded-full bg-primary-800/30 border border-primary-500/20 absolute -inset-10 blur-3xl pointer-events-none"></div>
              <img 
                src={regeneratedImage}
                alt="School kids eating" 
                className="rounded-lg shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clean School Portal Footer */}
      <footer className="bg-primary-800 text-white pt-16 pb-8 px-6 mt-0 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Column 1: About */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 text-white mb-6">
                <Utensils className="w-6 h-6 text-primary-200" />
                <span className="font-bold text-lg tracking-tight">ZPHS Arilova</span>
              </div>
              <p className="text-primary-100 text-sm leading-relaxed">
                ZPHS Arilova - Mid-Day Meal Management System. An initiative to streamline student attendance, daily nutrition tracking, and inventory transparency.
              </p>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="col-span-1">
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm text-primary-100">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Portal Access</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                <li><Link to="/dashboard/stock" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Support / Contact */}
            <div className="col-span-1">
              <h4 className="font-semibold text-white mb-4">Support & Contact</h4>
              <ul className="space-y-3 text-sm text-primary-100 mb-6">
                <li>Maintained by: CSE Student Team</li>
                <li>Visakhapatnam, AP</li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-700/50 flex flex-col md:flex-row justify-center items-center gap-4 text-center">
            <p className="text-primary-200 text-sm">© 2026 ZPHS Arilova. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
