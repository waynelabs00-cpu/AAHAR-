import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';

export default function Complaints() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  
  const mockComplaints = [
    { id: 'C-104', date: '2 days ago', subject: 'Meal Quality Issue', status: 'Resolved' },
    { id: 'C-108', date: 'Yesterday', subject: 'Attendance not marked', status: 'Pending' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    
    // Simulate submission
    setShowSuccess(true);
    setComplaintText('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-4xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Raise a Complaint</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Submit your concerns anonymously or with details.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              {showSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Complaint Submitted</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Thank you! The administration has been notified.</p>
                  <Button onClick={() => setShowSuccess(false)} variant="outline" className="mt-6">Submit Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                    <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                      <option>Food Quality</option>
                      <option>Food Quantity</option>
                      <option>Hygiene Issue</option>
                      <option>Attendance not Recorded</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Details</label>
                    <textarea 
                      rows={5}
                      value={complaintText}
                      onChange={(e) => setComplaintText(e.target.value)}
                      placeholder="Please describe your issue in detail..."
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none placeholder:text-slate-400"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" id="anonymous" className="rounded text-primary-600 focus:ring-primary-500/20 h-4 w-4 border-slate-300 dark:border-slate-700 dark:bg-slate-900" />
                    <label htmlFor="anonymous" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">Submit anonymously</label>
                  </div>
                  <Button type="submit" className="w-full gap-2 text-base h-11">
                    <Send className="w-4 h-4" /> Submit Complaint
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" /> Previous Complaints
          </h3>
          <div className="space-y-3">
            {mockComplaints.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-400">{c.id}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      c.status === 'Resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <h4 className="font-medium text-slate-900 dark:text-white dark:text-slate-100 text-sm mb-1">{c.subject}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    Submitted {c.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
