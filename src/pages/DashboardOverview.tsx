import React from 'react';
import { 
  Users, UserCheck, Utensils, AlertCircle, 
  TrendingUp, Download, Printer, ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { mockStats } from '@/src/lib/mockData';
import { useAuth } from '@/src/contexts/AuthContext';
import StudentDashboard from './StudentDashboard';

// Chart colors matching Tailwind theme
const colors = {
  primary: '#2e7d32', // green-800
  secondary: '#a5d6a7', // green-200
  accent: '#f57c00', // orange-600
  slate: '#e2e8f0', // slate-200
};

export default function DashboardOverview() {
  const { user, dbUser } = useAuth();
  
  if (dbUser?.role === 'student') {
    return <StudentDashboard />;
  }

  const canEdit = !!user && (dbUser?.role === 'admin' || dbUser?.role === 'teacher' || dbUser?.role === 'staff');

  const pieData = mockStats.mealDistribution.map((item, index) => ({
    ...item,
    color: index === 0 ? colors.primary : colors.accent,
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Today's Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none justify-center">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="default" className="gap-2 flex-1 sm:flex-none justify-center">
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <Badge variant="success" className="gap-1"><TrendingUp className="w-3 h-3" /> +2%</Badge>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{mockStats.totalStudents}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Total Enrolled</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{(mockStats.presentToday / mockStats.totalStudents * 100).toFixed(1)}%</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{mockStats.presentToday}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Present Today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="absolute right-0 top-0 w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 flex items-center justify-center">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Target: {mockStats.presentToday}</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{mockStats.mealsServedToday}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Meals Served</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="hover:shadow-md transition-shadow bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-orange-950 dark:text-orange-100 mt-4">{mockStats.remainingMeals}</h3>
              <p className="text-orange-800 dark:text-orange-300 text-sm font-medium mt-1">Remaining Meals Buffer</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-base">Attendance Trend (This Week)</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-2 bg-slate-50 dark:bg-slate-800">
                Weekly <ChevronDown className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockStats.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.slate} className="opacity-50 dark:opacity-20" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                    />
                    <Area type="monotone" dataKey="present" stroke={colors.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Stock Alerts */}
          <Card>
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Low Stock Alerts</span>
                <Badge variant="warning">2 Items</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockStats.foodStock.filter(item => item.status === 'Low').map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center font-semibold border border-orange-200 dark:border-orange-800">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Only {item.quantity} {item.unit} remaining</p>
                      </div>
                    </div>
                    {canEdit && (
                      <Button size="sm" variant="outline" className="text-primary-700 dark:text-primary-400 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 hover:text-primary-800 dark:hover:text-primary-300 shrink-0">
                        Request Restock
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Small Column */}
        <div className="space-y-6">
          <Card>
             <CardHeader className="pb-2">
              <CardTitle className="text-base text-center">Meal Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {Math.round((mockStats.mealsServedToday / (mockStats.mealsServedToday + mockStats.remainingMeals)) * 100)}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Served</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-2">
                {pieData.map(item => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Recent Absentees</span>
                <Button variant="link" size="sm" className="p-0 h-auto font-medium">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockStats.recentStudents.filter(s => s.attendance === 'Absent').map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-medium text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Class {student.class} • Roll {student.roll}</p>
                      </div>
                    </div>
                    <Badge variant="danger">Absent</Badge>
                  </div>
                ))}
                {mockStats.recentStudents.filter(s => s.attendance === 'Absent').length === 0 && (
                  <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    No recent absentees recorded.
                  </div>
                )}
               </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </motion.div>
  );
}
