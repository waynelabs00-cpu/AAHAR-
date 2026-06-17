import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { useAuth } from '@/src/contexts/AuthContext';
import { CheckCircle2, XCircle, Calendar as CalendarIcon, Clock, AlertTriangle } from 'lucide-react';

export default function StudentDashboard() {
  const { dbUser } = useAuth();
  
  // Mock data for student
  const attendancePercentage = 85;
  const recentMeals = [
    { date: 'Today', item: 'Rice & Dal', status: 'Received' },
    { date: 'Yesterday', item: 'Khichdi', status: 'Received' },
    { date: '2 days ago', item: 'Vegetable Pulao', status: 'Missed' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-5xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Student Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back, {dbUser?.firstName || 'Student'}. Here is your attendance and meal history.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" /> My Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{attendancePercentage}%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Current Month</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary-100 dark:border-primary-800 dark:border-primary-900/50 flex items-center justify-center relative">
                 <svg className="absolute inset-0 w-full h-full text-primary-500 dark:text-primary-400 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-current"
                    strokeWidth="4"
                    strokeDasharray={`${attendancePercentage}, 100`}
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
            {attendancePercentage < 75 && (
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 dark:text-orange-400 shrink-0" />
                <p className="text-sm text-orange-800 dark:text-orange-300">Your attendance is below 75%. Please ensure regular attendance to continue receiving meal benefits seamlessly.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" /> Recent Meals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentMeals.map((meal, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{meal.item}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{meal.date}</p>
                  </div>
                  <div className="flex items-center">
                    {meal.status === 'Received' ? (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-4 h-4" /> Received
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2.5 py-1 rounded-md">
                        <XCircle className="w-4 h-4" /> Missed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </motion.div>
  );
}
