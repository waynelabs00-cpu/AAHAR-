import React from 'react';
import { Bell, Check, Info, AlertTriangle, CheckCircle2, MoreVertical, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { useAuth } from '@/src/contexts/AuthContext';
import { mockStats } from '@/src/lib/mockData';

export default function Notifications() {
  const { user, dbUser } = useAuth();
  const isGuest = !user;

  const getIcon = (type: string) => {
    switch(type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBg = (type: string) => {
    switch(type) {
      case 'warning': return 'bg-orange-100 border-orange-200';
      case 'success': return 'bg-green-100 border-green-200';
      default: return 'bg-blue-100 border-blue-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Review system alerts, low stock warnings, and announcements.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900" disabled={isGuest}>
            <Check className="w-4 h-4" /> Mark all as read
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-xl">
           <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search notifications..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockStats.notifications.map((notif) => (
              <div key={notif.id} className={`p-6 flex items-start gap-4 transition-colors hover:bg-slate-50 dark:bg-slate-900 ${!notif.read ? 'bg-primary-50 dark:bg-primary-900/20/30' : ''}`}>
                 <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${getBg(notif.type)}`}>
                   {getIcon(notif.type)}
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-start justify-between gap-4">
                     <div>
                       <h4 className={`font-medium ${!notif.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{notif.title}</h4>
                       <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{notif.message}</p>
                       <p className="text-xs text-slate-400 mt-2">{notif.time}</p>
                     </div>
                     <button className="text-slate-400 hover:text-slate-600 dark:text-slate-400 transition-colors p-1.5 rounded-md hover:bg-slate-100 dark:bg-slate-800 shrink-0">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
