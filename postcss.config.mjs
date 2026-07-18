import { Link } from "react-router-dom";
import { Hospital, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Hospital size={40} className="text-blue-500" />
        </div>
        <h1 className="text-8xl font-bold text-blue-200 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          <ArrowLeft size={16} />Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
