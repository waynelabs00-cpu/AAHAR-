export const mockStats = {
  totalStudents: 1250,
  presentToday: 1180,
  mealsServedToday: 1150,
  remainingMeals: 30,
  foodStock: [
    { id: 1, name: 'Rice (Govt Supply)', quantity: 450, unit: 'kg', status: 'Good', lastUpdated: '2026-06-08' },
    { id: 2, name: 'Lentils (Toor Dal)', quantity: 80, unit: 'kg', status: 'Low', lastUpdated: '2026-06-08' },
    { id: 3, name: 'Mixed Vegetables', quantity: 120, unit: 'kg', status: 'Good', lastUpdated: '2026-06-09' },
    { id: 4, name: 'Eggs (Local Poultry)', quantity: 300, unit: 'pcs', status: 'Low', lastUpdated: '2026-06-09' },
    { id: 5, name: 'Cooking Oil (Fortified)', quantity: 45, unit: 'L', status: 'Good', lastUpdated: '2026-06-07' },
  ],
  attendanceTrend: [
    { name: 'Mon', present: 1100, absent: 150 },
    { name: 'Tue', present: 1150, absent: 100 },
    { name: 'Wed', present: 1180, absent: 70 },
    { name: 'Thu', present: 1210, absent: 40 },
    { name: 'Fri', present: 1195, absent: 55 },
  ],
  mealDistribution: [
    { name: 'Served', value: 1150 },
    { name: 'Remaining', value: 30 },
  ],
  recentStudents: [
    { id: 'STU001', name: 'Aarav Patel', class: 'X-A', roll: 1, attendance: 'Present' },
    { id: 'STU002', name: 'Diya Sharma', class: 'X-A', roll: 2, attendance: 'Present' },
    { id: 'STU003', name: 'Rohan Kumar', class: 'IX-B', roll: 14, attendance: 'Absent' },
    { id: 'STU004', name: 'Ananya Singh', class: 'VIII-C', roll: 5, attendance: 'Present' },
    { id: 'STU005', name: 'Ishaan Gupta', class: 'VII-A', roll: 21, attendance: 'Late' },
  ],
  mealHistory: [
    { id: 'ML001', date: '2026-06-09', menu: 'Rice & Dal', served: 1150, leftOver: 30, feedback: 'Good' },
    { id: 'ML002', date: '2026-06-08', menu: 'Veg Pulao', served: 1165, leftOver: 15, feedback: 'Excellent' },
    { id: 'ML003', date: '2026-06-07', menu: 'Roti & Sabzi', served: 1140, leftOver: 40, feedback: 'Average' },
    { id: 'ML004', date: '2026-06-06', menu: 'Rice & Egg Curry', served: 1180, leftOver: 0, feedback: 'Excellent' }
  ],
  auditLogs: [
    { id: 'AL001', time: '10:45 AM', user: 'Dr. R.K. Sharma', action: 'Approved Student Roster update', module: 'Student Management' },
    { id: 'AL002', time: '09:30 AM', user: 'Smt. Anita Desai', action: 'Logged Morning Attendance', module: 'Attendance' },
    { id: 'AL003', time: '08:15 AM', user: 'Rahul Verma', action: 'Updated Rice Stock (+50kg)', module: 'Inventory' },
    { id: 'AL004', time: 'Yesterday', user: 'System', action: 'Automated Daily Backup Completed', module: 'System' }
  ],
  notifications: [
    { id: 'N001', type: 'warning', title: 'Low Stock Alert', message: 'Lentils (Toor Dal) is running low. Please reorder.', time: '2 hours ago', read: false },
    { id: 'N002', type: 'info', title: 'New Enrollment', message: '5 new students added to class VIII-C.', time: '5 hours ago', read: false },
    { id: 'N003', type: 'success', title: 'Audit Passed', message: 'Monthly District Meal Audit passed successfully.', time: '1 day ago', read: true }
  ]
};

export const schools = [
  { id: 'SCH001', name: 'Govt. Senior Secondary School, Sector 12', principal: 'Dr. R.K. Sharma', code: '10012' }
];

export const usersList = [
  { id: 'U001', name: 'Dr. R.K. Sharma', role: 'Admin', email: 'principal@gsss12.edu', status: 'Active' },
  { id: 'U002', name: 'Anita Desai', role: 'Teacher', email: 'anita.desai@gsss12.edu', status: 'Active' },
  { id: 'U003', name: 'Rahul Verma', role: 'Staff', email: 'rahul.stock@gsss12.edu', status: 'Active' },
  { id: 'U004', name: 'Priya Kiran', role: 'Teacher', email: 'priya.k@gsss12.edu', status: 'Inactive' }
];

export const STOCK_ITEMS = ['Rice', 'Dal', 'Oil', 'Vegetables', 'Eggs', 'Milk', 'Spices'];
export const CLASSES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
