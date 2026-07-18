import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { type ReactNode } from "react";
import { useAuth } from "../hooks/useAppData";
import { DashboardLayout } from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PasienPage from "../pages/Pasien";
import DokterPage from "../pages/Dokter";
import PoliklinikPage from "../pages/Poliklinik";
import JadwalDokterPage from "../pages/JadwalDokter";
import PendaftaranPage from "../pages/Pendaftaran";
import RekamMedisPage from "../pages/RekamMedis";
import ResepPage from "../pages/Resep";
import PembayaranPage from "../pages/Pembayaran";
import ProfilPage from "../pages/Profil";
import NotFound from "../pages/NotFound";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

function DashboardRoutes({ onLogout }: { onLogout: () => void }) {
  return (
    <DashboardLayout onLogout={onLogout}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pasien/*" element={<PasienPage />} />
        <Route path="dokter" element={<DokterPage />} />
        <Route path="poliklinik" element={<PoliklinikPage />} />
        <Route path="jadwal-dokter" element={<JadwalDokterPage />} />
        <Route path="pendaftaran" element={<PendaftaranPage />} />
        <Route path="rekam-medis" element={<RekamMedisPage />} />
        <Route path="resep" element={<ResepPage />} />
        <Route path="pembayaran" element={<PembayaranPage />} />
        <Route path="profil" element={<ProfilPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

function AppRoutes() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <AppRoutes />
    </BrowserRouter>
  );
}
