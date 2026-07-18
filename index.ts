import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, UserRound, Building2, Calendar, ClipboardList,
  FileText, Pill, CreditCard, User, LogOut, Menu, X, Bell, Search,
  ChevronDown, Hospital
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pasien", label: "Data Pasien", icon: Users },
  { path: "/dokter", label: "Data Dokter", icon: UserRound },
  { path: "/poliklinik", label: "Poliklinik", icon: Building2 },
  { path: "/jadwal-dokter", label: "Jadwal Dokter", icon: Calendar },
  { path: "/pendaftaran", label: "Pendaftaran", icon: ClipboardList },
  { path: "/rekam-medis", label: "Rekam Medis", icon: FileText },
  { path: "/resep", label: "Resep Obat", icon: Pill },
  { path: "/pembayaran", label: "Pembayaran", icon: CreditCard },
  { path: "/profil", label: "Profil", icon: User },
];

interface DashboardLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const currentNav = navItems.find((n) => location.pathname.startsWith(n.path));

  return (
    <div className="flex h-screen bg-[#f0f4f8] overflow-hidden">
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={clsx(
        "fixed lg:relative z-40 h-full bg-[#1e3a8a] text-white flex flex-col transition-all duration-300 flex-shrink-0",
        sidebarOpen ? "w-64" : "w-16",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className={clsx("flex items-center gap-3 px-4 py-5 border-b border-white/10", !sidebarOpen && "justify-center")}>
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Hospital size={20} className="text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-bold text-sm leading-tight">Medika Hospital</p>
              <p className="text-blue-200 text-xs">Management System</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname.startsWith(path) && (path !== "/pasien" || location.pathname.startsWith("/pasien"));
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                title={!sidebarOpen ? label : undefined}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
                  active
                    ? "bg-white/20 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white",
                  !sidebarOpen && "justify-center"
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 pb-4">
          <button
            onClick={handleLogout}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all w-full",
              !sidebarOpen && "justify-center"
            )}
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 flex-shrink-0 shadow-sm">
          <button
            onClick={() => { setSidebarOpen(!sidebarOpen); setMobileOpen(!mobileOpen); }}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 lg:block hidden"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 lg:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 max-w-xs">
            <Search size={15} className="text-gray-400" />
            <input type="text" placeholder="Cari..." className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 w-full" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell size={18} className="text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">A</div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                  <p className="text-xs text-gray-400 leading-tight">Administrator</p>
                </div>
                <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link to="/profil" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={14} />Profil Saya
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                    <LogOut size={14} />Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="px-4 py-2 bg-white border-b border-gray-100 flex items-center gap-2 text-sm flex-shrink-0">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Beranda</Link>
          {currentNav && currentNav.path !== "/dashboard" && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-gray-600">{currentNav.label}</span>
            </>
          )}
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
