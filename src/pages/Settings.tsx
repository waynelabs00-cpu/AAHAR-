import React from 'react';
import { Save, Bell, Shield, Database, Layout, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Settings() {
  const { user, dbUser } = useAuth();
  
  const isGuest = !user;
  const isAdmin = !isGuest && dbUser?.role === 'admin';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure academic year, UI preferences, and modules.</p>
        </div>
        {!isAdmin && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
            <Lock className="w-3 h-3" /> Admin Settings Disabled
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          {[
            { id: 'general', label: 'General', icon: Layout, active: true },
            { id: 'notifications', label: 'Notifications', icon: Bell, active: false },
            { id: 'security', label: 'Security', icon: Shield, active: false },
            { id: 'backup', label: 'Backup & Restore', icon: Database, active: false },
          ].map((tab) => (
             <button 
               key={tab.id}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${tab.active ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 hover:text-slate-900 dark:text-white'}`}
             >
               <tab.icon className="w-4 h-4" />
               {tab.label}
             </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">School Name</label>
                  <input type="text" disabled={!isAdmin} defaultValue="Govt. Senior Secondary School, Sector 12" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">DISE Code</label>
                  <input type="text" disabled={!isAdmin} defaultValue="030219082" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Principal / Administrator</label>
                <input type="text" disabled={!isAdmin} defaultValue="Dr. R.K. Sharma" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                 <div>
                   <p className="font-medium text-slate-900 dark:text-white">Current Academic Year</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400">2026 - 2027</p>
                 </div>
                 <Button variant="outline" disabled={!isAdmin}>Change Term</Button>
               </div>
               <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                 <div>
                   <p className="font-medium text-slate-900 dark:text-white">Weekend Operations</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Allow attendance & meal tracking on Saturdays.</p>
                 </div>
                 <div className="relative inline-block w-12 h-6 cursor-pointer">
                    <input type="checkbox" className="peer sr-only" defaultChecked disabled={!isAdmin} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-slate-900 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                 </div>
               </div>
            </CardContent>
          </Card>

          {isAdmin && (
            <div className="flex justify-end pt-4">
              <Button className="gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
