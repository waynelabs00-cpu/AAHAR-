import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Download, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { db } from '@/src/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { useAuth } from '@/src/contexts/AuthContext';
import { mockStats } from '@/src/lib/mockData';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', roll: '' });
  const { user, dbUser } = useAuth();
  
  const isGuest = !user;
  const canEdit = !isGuest && (dbUser?.role === 'admin' || dbUser?.role === 'teacher' || dbUser?.role === 'staff');

  const fetchStudents = async () => {
    if (isGuest || !dbUser?.schoolId) {
      setStudents(mockStats.recentStudents.map(s => ({ ...s, id: s.id })));
      return;
    }
    try {
      const q = query(collection(db, 'students'), where('schoolId', '==', dbUser.schoolId));
      const querySnapshot = await getDocs(q);
      const studentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentData.length > 0 ? studentData : mockStats.recentStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents(mockStats.recentStudents);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [user, dbUser]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;
    if (!newStudent.name || !newStudent.class || !dbUser?.schoolId) return;
    
    try {
      await addDoc(collection(db, 'students'), {
        ...newStudent,
        schoolId: dbUser.schoolId,
        createdAt: serverTimestamp()
      });
      setNewStudent({ name: '', class: '', roll: '' });
      setIsAdding(false);
      fetchStudents();
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Student Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage enrollments, classes, and scholar profiles.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-800 hidden sm:flex">
            <Download className="w-4 h-4" /> Export
          </Button>
          {canEdit ? (
            <Button className="gap-2" onClick={() => setIsAdding(!isAdding)}>
              <Plus className="w-4 h-4" /> Add Student
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <Lock className="w-3 h-3" /> Read Only (Guest)
            </div>
          )}
        </div>
      </div>

      {isAdding && canEdit && (
        <Card className="mb-6 border-primary-200 dark:border-primary-700 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20/30 dark:bg-primary-900/10">
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleAddStudent} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <Input 
                  label="Student Name" 
                  value={newStudent.name} 
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="flex-1 w-full">
                <Input 
                  label="Class" 
                  value={newStudent.class} 
                  onChange={(e) => setNewStudent({...newStudent, class: e.target.value})} 
                  required 
                  placeholder="e.g. X-A"
                />
              </div>
              <div className="flex-1 w-full">
                <Input 
                  label="Roll No" 
                  value={newStudent.roll} 
                  onChange={(e) => setNewStudent({...newStudent, roll: e.target.value})} 
                  required 
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto h-11 shrink-0">Save Student</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50 rounded-t-xl">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <Button variant="outline" className="gap-2 bg-white dark:bg-slate-800 flex-1 sm:flex-none">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Student ID</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Class</th>
                  <th className="px-6 py-4 font-medium">Roll No</th>
                  <th className="px-6 py-4 font-medium">Eligibility</th>
                  {canEdit && <th className="px-6 py-4 font-medium text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400 font-xs truncate max-w-[100px]">{student.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white dark:text-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center font-semibold text-xs border border-primary-100 dark:border-primary-800 shrink-0">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{student.class}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{student.roll}</td>
                    <td className="px-6 py-4">
                      <Badge variant="success">Eligible</Badge>
                    </td>
                    {canEdit && (
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={canEdit ? 6 : 5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50">
                      {searchTerm ? 'No students found matching your search.' : 'No students registered. Add a student to begin.'}
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
