import React, { useState } from 'react';
import { Download, FileText, Filter, Calendar as CalendarIcon, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { useAuth } from '@/src/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockStats } from '@/src/lib/mockData';

export default function Reports() {
  const { user } = useAuth();
  
  const isGuest = !user;

  const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b'];

  const reportsList = [
    { id: 'REP-01', name: 'Monthly Attendance Summary', category: 'Attendance', date: 'Jun 1, 2026', size: '2.4 MB' },
    { id: 'REP-02', name: 'Dietary Compliance Report', category: 'Meals', date: 'Jun 1, 2026', size: '1.1 MB' },
    { id: 'REP-03', name: 'Stock Depletion Analysis', category: 'Inventory', date: 'May 31, 2026', size: '3.8 MB' },
    { id: 'REP-04', name: 'District Audit Submission', category: 'Compliance', date: 'May 15, 2026', size: '5.2 MB' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Visualize data and generate compliance reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 flex items-center gap-2 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            Last 30 Days
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" /> Download All
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary-600" /> Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockStats.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="present" name="Present" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="absent" name="Absent" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2"><PieChartIcon className="w-5 h-5 text-primary-600" /> Meal Distribution Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-64 w-full mt-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockStats.mealDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockStats.mealDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{mockStats.mealsServedToday}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Meals Served</span>
              </div>
            </div>
            
            <div className="flex gap-6 mt-4">
              {mockStats.mealDistribution.map((item, index) => (
                 <div key={index} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                   <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.name} ({item.value})</span>
                 </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-xl">
           <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><FileText className="w-5 h-5 text-slate-500 dark:text-slate-400" /> Generated Reports</h3>
           <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900 h-9 text-xs">
              <Filter className="w-3 h-3" /> Filter Format
            </Button>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Report Name</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Generated Date</th>
                  <th className="px-6 py-4 font-medium">Size</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {reportsList.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 dark:bg-slate-900/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{report.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{report.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{report.date}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-mono">{report.size}</td>
                    <td className="px-6 py-4 text-right">
                       <Button variant="outline" className="h-8 px-3 text-xs gap-1.5 hover:bg-primary-50 dark:bg-primary-900/20 hover:text-primary-700 hover:border-primary-200 dark:border-primary-700">
                          <Download className="w-3 h-3" /> PDF
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
