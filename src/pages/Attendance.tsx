import React, { useState, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, Check, Lock, Download, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useAuth } from '@/src/contexts/AuthContext';
import { mockStats } from '@/src/lib/mockData';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

interface StudentInfo {
  id: string;
  name: string;
  class: string;
  roll: string | number;
  attendance: 'Present' | 'Absent' | 'Late' | string;
}

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [students, setStudents] = useState<StudentInfo[]>(mockStats.recentStudents as StudentInfo[]); // Fallback
  const [loading, setLoading] = useState(true);
  const { user, dbUser } = useAuth();
  
  const isGuest = !user;
  const canEdit = !isGuest && (dbUser?.role === 'admin' || dbUser?.role === 'teacher' || dbUser?.role === 'staff');

  useEffect(() => {
    // Realtime listener for students collection
    const studentsRef = collection(db, 'students');
    
    const unsubscribe = onSnapshot(studentsRef, (snapshot) => {
      if (!snapshot.empty) {
        const studentData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StudentInfo[];
        setStudents(studentData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error fetching students:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const filteredStudents = students.filter(student => 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedClass === 'All' || student.class === selectedClass)
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Attendance Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track daily attendance and manage leaves.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-800 hidden sm:flex">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          {!canEdit ? (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <Lock className="w-3 h-3" /> Read Only
            </div>
          ) : (
            <Button className="gap-2">
              <Check className="w-4 h-4" /> Mark All Present
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary-50 dark:bg-primary-900/20/50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Present Today</p>
              <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-300">{mockStats.presentToday}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50/50 dark:bg-red-900/20 border-red-100 dark:border-red-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Absent Today</p>
              <h3 className="text-2xl font-bold text-red-700 dark:text-red-300">{mockStats.totalStudents - mockStats.presentToday - 15}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50/50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late / Half-day</p>
              <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-300">15</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50 rounded-t-xl">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by student name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="gap-2 bg-white dark:bg-slate-800 flex-1 sm:flex-none" onClick={() => setSelectedClass(selectedClass === 'All' ? 'X-A' : 'All')}>
              <Filter className="w-4 h-4" /> {selectedClass === 'All' ? 'All Classes' : 'Class X-A'}
            </Button>
            <div className="h-10 flex items-center gap-2 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 dark:text-slate-200 whitespace-nowrap">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
              Today, Jun 9
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Student Info</th>
                  <th className="px-6 py-4 font-medium">Class / Roll</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  {canEdit && <th className="px-6 py-4 font-medium text-right">Update Status</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 dark:text-slate-300 flex items-center justify-center font-semibold text-xs border border-slate-200 dark:border-slate-700 shrink-0">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white dark:text-slate-100">{student.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {student.class} / {student.roll}
                    </td>
                    <td className="px-6 py-4">
                      {student.attendance === 'Present' && <Badge variant="success">Present</Badge>}
                      {student.attendance === 'Absent' && <Badge variant="danger">Absent</Badge>}
                      {student.attendance === 'Late' && <Badge variant="warning">Late</Badge>}
                    </td>
                    {canEdit && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors p-1.5 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30" title="Mark Present">
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30" title="Mark Absent">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={canEdit ? 4 : 3} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50">
                      No records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Showing {filteredStudents.length} entries</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
