import React, { useState } from 'react';
import { Search, Utensils, AlertTriangle, ChevronRight, Lock, Calendar, Plus, ChefHat, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useAuth } from '@/src/contexts/AuthContext';
import { mockStats } from '@/src/lib/mockData';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Meals() {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, dbUser } = useAuth();
  const { grade } = useParams();
  const navigate = useNavigate();
  
  const isGuest = !user;
  const canEdit = !isGuest && (dbUser?.role === 'admin' || dbUser?.role === 'teacher' || dbUser?.role === 'staff');

  const mealHistory = mockStats.mealHistory.filter(meal => 
    meal.menu.toLowerCase().includes(searchTerm.toLowerCase()) || 
    meal.date.includes(searchTerm)
  );

  const grades = Array.from({ length: 10 }, (_, i) => i + 1);

  if (grade) {
    // Generate dummy students for this grade
    const classStudents = Array.from({ length: 30 }, (_, i) => ({
      id: `S${grade}0${i + 1}`,
      name: `Student ${i + 1}`,
      rollNo: i + 1,
      hasReceivedMeal: Math.random() > 0.3,
    }));

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }} 
        className="p-6 max-w-7xl mx-auto space-y-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/meals')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Grade {grade} Meal Distribution</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track meals for students in Class {grade}.</p>
          </div>
        </div>

        <Card>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
            <h3 className="font-semibold text-slate-800">Student Roll</h3>
            <div className="flex gap-2">
              <Badge variant="success">{classStudents.filter(s => s.hasReceivedMeal).length} Served</Badge>
              <Badge variant="warning">{classStudents.filter(s => !s.hasReceivedMeal).length} Pending</Badge>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-medium">Roll No</th>
                    <th className="px-6 py-4 font-medium">Student Name</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{student.rollNo}</td>
                      <td className="px-6 py-4 text-slate-700">{student.name}</td>
                      <td className="px-6 py-4">
                        {student.hasReceivedMeal ? (
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Meal Received
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!student.hasReceivedMeal && canEdit ? (
                          <Button size="sm" className="h-8">Mark Served</Button>
                        ) : (
                          <span className="text-xs text-slate-400">Recorded</span>
                        )}
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Meal Distribution</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage daily menus, food distribution, and student feedback.</p>
        </div>
        <div className="flex items-center gap-3">
          {!canEdit ? (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <Lock className="w-3 h-3" /> Read Only
            </div>
          ) : (
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Log Today's Meal
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {grades.map(g => (
          <Link key={g} to={`/dashboard/meals/${g}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white border-slate-200 hover:border-primary-300 group h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {g}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Grade {g}</h3>
                  <p className="text-xs text-slate-500 mt-1">View Distribution</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary-50 dark:bg-primary-900/20/50 border-primary-100 dark:border-primary-800 md:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-primary-100 flex items-center gap-2"><ChefHat className="w-5 h-5 text-primary-600 dark:text-primary-400" /> Today's Menu</h3>
                <p className="text-sm text-primary-700/80 dark:text-primary-300 mt-1">Jun 9, 2026 - Primary & Secondary</p>
              </div>
              <Badge className="bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 border-primary-200 dark:border-primary-700">Serving Now</Badge>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary-100 dark:border-primary-800 mb-6">
              <p className="text-xl font-medium text-slate-800 dark:text-slate-100">Fortified Rice with Mixed Dal & Seasonal Vegetable Stew</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Eligible Students</p>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{mockStats.presentToday}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Meals Served</p>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{mockStats.mealsServedToday}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Leftover Buffer</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Currently projecting {mockStats.remainingMeals} surplus meals based on today's attendance.</p>
            </div>
            {canEdit && (
              <Button variant="outline" className="w-full mt-4 bg-white dark:bg-slate-800">Adjust Allocation</Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50 rounded-t-xl">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search meal history..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 placeholder:text-slate-400"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Menu Details</th>
                  <th className="px-6 py-4 font-medium text-right">Served</th>
                  <th className="px-6 py-4 font-medium text-right">Leftover</th>
                  <th className="px-6 py-4 font-medium">Feedback</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mealHistory.length > 0 ? mealHistory.map((meal) => (
                  <tr key={meal.id} className="hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                         <Calendar className="w-4 h-4 text-slate-400" />
                         {meal.date}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 ml-6">{meal.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">{meal.menu}</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-700 dark:text-slate-300">{meal.served}</td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={meal.leftOver > 20 ? "warning" : "success"}>{meal.leftOver} meals</Badge>
                    </td>
                    <td className="px-6 py-4">
                       <span className="capitalize text-slate-600 dark:text-slate-400">{meal.feedback}</span>
                    </td>
                     <td className="px-6 py-4 text-right">
                       <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-end w-full gap-1">
                         Details <ChevronRight className="w-3 h-3" />
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
