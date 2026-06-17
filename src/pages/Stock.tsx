import React, { useState, useEffect } from 'react';
import { Plus, Search, ArrowUpRight, ArrowDownRight, AlertTriangle, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { mockStats } from '@/src/lib/mockData';
import { useAuth } from '@/src/contexts/AuthContext';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

interface StockItem {
  id: string | number;
  name: string;
  quantity: number;
  unit: string;
  status: 'Sufficient' | 'Low' | string;
  lastUpdated: string;
}

export default function Stock() {
  const [stockItems, setStockItems] = useState<StockItem[]>(mockStats.foodStock as StockItem[]); // Fallback to mock data initially
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, dbUser } = useAuth();
  
  const isGuest = !user;
  const canEdit = !isGuest && (dbUser?.role === 'admin' || dbUser?.role === 'teacher' || dbUser?.role === 'staff');

  useEffect(() => {
    // Set up Firestore listener for realtime stock updates
    const inventoryRef = collection(db, 'inventory');
    
    const unsubscribe = onSnapshot(inventoryRef, (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StockItem[];
        setStockItems(items);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error fetching inventory:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Food Stock</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and track inventory levels for midday meals.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
             <Button className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 shadow-none hover:bg-primary-100 rounded-md">Current Stock</Button>
             <Button variant="ghost" className="rounded-md">Stock History</Button>
          </div>
          {!canEdit && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <Lock className="w-3 h-3" /> Read Only
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-none text-white">
          <CardContent className="p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-1">Total Ingredients</h3>
            <div className="text-3xl font-bold mb-4">{stockItems.length}</div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
              <div className="bg-primary-50 dark:bg-primary-900/200 h-1.5 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-slate-400">80% of items are fully stocked</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-orange-800 text-sm font-medium mb-1">Items Running Low</h3>
                <div className="text-3xl font-bold text-orange-950">{stockItems.filter(i => i.status === 'Low').length}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            {canEdit && (
              <Button size="sm" variant="outline" className="w-full mt-4 bg-white dark:bg-slate-900 border-orange-200 text-orange-700 hover:bg-orange-100">
                Generate Request
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-6 flex flex-col justify-center items-center h-full text-center">
             <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 mb-4">
                <Plus className="w-6 h-6" />
             </div>
             <p className="font-medium text-slate-900 dark:text-white mb-1">Receive New Stock</p>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Log incoming deliveries</p>
             <Button variant="default" className="w-full" disabled={!canEdit}>Add Delivery</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-xl">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Item Name</th>
                  <th className="px-6 py-4 font-medium">Quantity Available</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Last Updated</th>
                  {canEdit && <th className="px-6 py-4 font-medium text-right">Quick Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {stockItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:bg-slate-900/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base">{item.quantity}</span>
                        <span className="text-slate-500 dark:text-slate-400">{item.unit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'Low' ? (
                        <Badge variant="warning">Low Stock</Badge>
                      ) : (
                        <Badge variant="success">Sufficient</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.lastUpdated}</td>
                    {canEdit && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="icon" variant="outline" className="w-8 h-8 rounded-full border-slate-200 dark:border-slate-700" title="Reduce Stock">
                            <ArrowDownRight className="w-4 h-4 text-orange-500" />
                          </Button>
                          <Button size="icon" variant="outline" className="w-8 h-8 rounded-full border-slate-200 dark:border-slate-700" title="Add Stock">
                            <ArrowUpRight className="w-4 h-4 text-primary-500" />
                          </Button>
                        </div>
                      </td>
                    )}
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
