import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, Utensils, PackageSearch, 
  BarChart3, Bell, Menu, Search, LogOut, Settings, 
  ChevronLeft, LayoutDashboard
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768);
  const navigate = useNavigate();
  const { user, dbUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isStudent = dbUser?.role === 'student';

  const navItems = isStudent ? [
    { icon: LayoutDashboard, label: 'My Dashboard', path: '/dashboard' },
    { icon: Utensils, label: 'Raise Complaint', path: '/dashboard/complaints' },
  ] : [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Student Management', path: '/dashboard/students' },
    { icon: Calendar, label: 'Attendance Management', path: '/dashboard/attendance' },
    { icon: Utensils, label: 'Meal Distribution', path: '/dashboard/meals' },
    { icon: PackageSearch, label: 'Inventory Management', path: '/dashboard/stock' },
    { icon: BarChart3, label: 'Reports & Analytics', path: '/dashboard/reports' },
    { icon: Users, label: 'Role Management', path: '/dashboard/users' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: Menu, label: 'Audit Logs', path: '/dashboard/audit' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 dark:bg-slate-950 overflow-hidden font-sans">
      {/* Overlay for mobile sidebar */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 z-20 md:hidden" 
          onClick={() => setCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col z-30",
          "fixed inset-y-0 left-0 md:relative md:translate-x-0 h-full",
          collapsed ? "-translate-x-full md:w-20" : "translate-x-0 w-64"
        )}
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap text-primary-800 dark:text-primary-500 font-bold text-lg hover:text-primary-900 dark:hover:text-primary-400 transition-colors">
            <Utensils className="w-8 h-8 flex-shrink-0 text-primary-600 dark:text-primary-500" />
            {!collapsed && <span>ZPHS Arilova</span>}
          </Link>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-transform hover:scale-110"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setCollapsed(true);
                }
              }}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group overflow-hidden whitespace-nowrap",
                isActive 
                  ? "bg-primary-50 dark:bg-primary-900/20 dark:bg-slate-800 text-primary-800 dark:text-white" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-white"
              )}
              title={item.label}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <NavLink 
            to="/dashboard/settings"
            onClick={() => {
              if (window.innerWidth < 768) {
                setCollapsed(true);
              }
            }}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group overflow-hidden whitespace-nowrap",
              isActive ? "bg-primary-50 dark:bg-primary-900/20 dark:bg-slate-800 text-primary-800 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 hover:text-slate-900 dark:text-white dark:hover:text-white"
            )}
            title="Settings"
          >
            <Settings className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all group overflow-hidden whitespace-nowrap mt-1"
            title="Logout"
          >
            <LogOut className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 flex-shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500 dark:text-slate-400" onClick={() => setCollapsed(!collapsed)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative group hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search everywhere..." 
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-700 dark:text-white transition-all"
              />
            </div>
            <button 
              onClick={() => navigate(-1)} 
              className="text-sm font-medium flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors ml-2 sm:ml-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full"
            >
              <span className="text-lg leading-none">&larr;</span>
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                  {dbUser ? `${dbUser.firstName} ${dbUser.lastName}` : (user?.displayName || 'User')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{dbUser?.role || 'Staff'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm border border-primary-200 dark:border-primary-700 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile avatar" className="w-full h-full object-cover" />
                ) : (
                  (dbUser?.firstName?.[0] || user?.displayName?.[0] || 'U').toUpperCase()
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
