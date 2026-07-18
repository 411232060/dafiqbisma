import { useAppData } from "../hooks/useAppData";
import { formatTanggal, formatTanggalPendek } from "../utils/format";
import { Badge, statusPendaftaranVariant } from "../components/ui/Badge";
import { Users, UserRound, Building2, ClipboardList, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const kunjunganData = [
  { hari: "Sen", jumlah: 24 },
  { hari: "Sel", jumlah: 18 },
  { hari: "Rab", jumlah: 30 },
  { hari: "Kam", jumlah: 22 },
  { hari: "Jum", jumlah: 28 },
  { hari: "Sab", jumlah: 15 },
  { hari: "Min", jumlah: 8 },
];

const POLI_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#ec4899"];

export default function Dashboard() {
  const { data } = useAppData();

  const today = new Date().toISOString().split("T")[0];
  const pendaftaranHariIni = data.pendaftaran.filter((p) => p.tanggal === today || p.tanggal === "2024-07-18");
  const menunggu = data.pendaftaran.filter((p) => p.status === "Menunggu").length;
  const selesai = data.pendaftaran.filter((p) => p.status === "Selesai").length;

  const poliData = data.poliklinik.map((poli) => ({
    name: poli.namaPoliklinik.replace("Poli ", ""),
    jumlah: data.pendaftaran.filter((p) => p.poliklinikId === poli.id).length,
  }));

  const recentPendaftaran = [...data.pendaftaran]
    .sort((a, b) => b.nomorPendaftaran.localeCompare(a.nomorPendaftaran))
    .slice(0, 6);

  const jadwalHariIni = data.jadwalDokter
    .filter((j) => j.status === "Aktif")
    .slice(0, 4)
    .map((j) => {
      const dok = data.dokter.find((d) => d.id === j.dokterId);
      const poli = data.poliklinik.find((p) => p.id === j.poliklinikId);
      return { ...j, dokter: dok, poli };
    });

  const stats = [
    { label: "Total Pasien", value: data.pasien.length, icon: Users, color: "bg-blue-500", light: "bg-blue-50 text-blue-600" },
    { label: "Total Dokter", value: data.dokter.length, icon: UserRound, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600" },
    { label: "Total Poliklinik", value: data.poliklinik.length, icon: Building2, color: "bg-violet-500", light: "bg-violet-50 text-violet-600" },
    { label: "Pendaftaran Hari Ini", value: pendaftaranHariIni.length, icon: ClipboardList, color: "bg-orange-500", light: "bg-orange-50 text-orange-600" },
    { label: "Pasien Menunggu", value: menunggu, icon: Clock, color: "bg-amber-500", light: "bg-amber-50 text-amber-600" },
    { label: "Pemeriksaan Selesai", value: selesai, icon: CheckCircle, color: "bg-green-500", light: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">{formatTanggal(today)} — Selamat datang kembali, Admin!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(({ label, value, icon: Icon, light }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${light}`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-gray-500 text-xs mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-900">Kunjungan Pasien</h2>
              <p className="text-gray-400 text-xs mt-0.5">7 hari terakhir</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2.5 py-1 rounded-full">
              <TrendingUp size={12} /> +12%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={kunjunganData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hari" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
              <Bar dataKey="jumlah" name="Pasien" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-1">Pasien per Poliklinik</h2>
          <p className="text-gray-400 text-xs mb-5">Total kunjungan</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={poliData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="jumlah" paddingAngle={3}>
                {poliData.map((_, i) => (
                  <Cell key={i} fill={POLI_COLORS[i % POLI_COLORS.length]} />
                ))}
              </Pie>
              <Legend formatter={(v) => <span className="text-xs text-gray-600">{v}</span>} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Pendaftaran Terbaru</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">No. Daftar</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pasien</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Poliklinik</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentPendaftaran.map((p) => {
                  const pasien = data.pasien.find((ps) => ps.id === p.pasienId);
                  const poli = data.poliklinik.find((pl) => pl.id === p.poliklinikId);
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-blue-600 font-medium">{p.nomorPendaftaran}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{pasien?.namaLengkap}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{poli?.namaPoliklinik}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusPendaftaranVariant(p.status)}>{p.status}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Jadwal Dokter Hari Ini</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {jadwalHariIni.map((j) => (
              <div key={j.id} className="px-4 py-3 flex items-center gap-3">
                <img src={j.dokter?.foto} alt={j.dokter?.namaLengkap} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 bg-gray-100" />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{j.dokter?.namaLengkap}</p>
                  <p className="text-xs text-gray-400">{j.poli?.namaPoliklinik}</p>
                  <p className="text-xs text-blue-600 font-medium">{j.jamMulai} – {j.jamSelesai}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
