import { useState } from "react";
import { Plus, Search, Eye, CreditCard } from "lucide-react";
import { useAppData } from "../hooks/useAppData";
import { Badge, statusPembayaranVariant } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Pagination } from "../components/ui/Pagination";
import { formatTanggalPendek, formatRupiah, generateId, generateNomor } from "../utils/format";
import type { Pembayaran, StatusPembayaran } from "../types";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 8;
const emptyForm = { pasienId: "", pendaftaranId: "", biayaPemeriksaan: 150000, biayaObat: 0, biayaTambahan: 0, metodePembayaran: "Tunai" as const };

export default function PembayaranPage() {
  const { data, updateData } = useAppData();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDetail, setModalDetail] = useState<Pembayaran | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = data.pembayaran.filter((p) => {
    const pasien = data.pasien.find((ps) => ps.id === p.pasienId);
    const matchSearch = !search || pasien?.namaLengkap.toLowerCase().includes(search.toLowerCase()) || p.nomorPembayaran.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || p.status === filterStatus;
    return matchSearch && matchStatus;
  }).sort((a, b) => b.nomorPembayaran.localeCompare(a.nomorPembayaran));

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const total = form.biayaPemeriksaan + form.biayaObat + form.biayaTambahan;

  const handleAdd = () => {
    if (!form.pasienId || !form.pendaftaranId) { toast.error("Harap pilih pasien dan pendaftaran."); return; }
    const newPay: Pembayaran = {
      ...form,
      id: generateId(),
      nomorPembayaran: generateNomor("INV", data.pembayaran.map((p) => p.nomorPembayaran)),
      totalPembayaran: total,
      status: "Belum Dibayar",
      tanggalPembayaran: "",
      createdAt: new Date().toISOString().split("T")[0],
    };
    updateData({ pembayaran: [...data.pembayaran, newPay] });
    toast.success("Tagihan berhasil dibuat.");
    setModalAdd(false); setForm(emptyForm);
  };

  const prosesPembayaran = (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    updateData({
      pembayaran: data.pembayaran.map((p) =>
        p.id === id ? { ...p, status: "Sudah Dibayar" as StatusPembayaran, tanggalPembayaran: today } : p
      ),
    });
    toast.success("Pembayaran berhasil diproses.");
  };

  const batalkanPembayaran = (id: string) => {
    updateData({
      pembayaran: data.pembayaran.map((p) =>
        p.id === id ? { ...p, status: "Dibatalkan" as StatusPembayaran } : p
      ),
    });
    toast.success("Pembayaran dibatalkan.");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
          <p className="text-gray-500 text-sm mt-0.5">{data.pembayaran.length} tagihan</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setModalAdd(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} />Buat Tagihan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[180px]">
            <Search size={14} className="text-gray-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Cari pasien / nomor tagihan..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
            <option value="">Semua Status</option>
            {["Belum Dibayar", "Sudah Dibayar", "Dibatalkan"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {paged.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <CreditCard size={40} className="mx-auto mb-3 opacity-30" />
            <p>Tidak ada data pembayaran</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50">
                  {["No. Tagihan", "Pasien", "Total", "Metode", "Tgl. Bayar", "Status", "Aksi"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paged.map((p) => {
                  const pasien = data.pasien.find((ps) => ps.id === p.pasienId);
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-blue-600 font-medium whitespace-nowrap">{p.nomorPembayaran}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{pasien?.namaLengkap}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{formatRupiah(p.totalPembayaran)}</td>
                      <td className="px-4 py-3 text-gray-600">{p.metodePembayaran}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.tanggalPembayaran ? formatTanggalPendek(p.tanggalPembayaran) : "-"}</td>
                      <td className="px-4 py-3"><Badge variant={statusPembayaranVariant(p.status)}>{p.status}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setModalDetail(p)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Eye size={14} /></button>
                          {p.status === "Belum Dibayar" && (
                            <button onClick={() => prosesPembayaran(p.id)} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 whitespace-nowrap font-medium">Bayar</button>
                          )}
                          {p.status === "Belum Dibayar" && (
                            <button onClick={() => batalkanPembayaran(p.id)} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200 whitespace-nowrap font-medium">Batal</button>
                          )}
                          {p.status === "Sudah Dibayar" && (
                            <button onClick={() => window.print()} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-200 whitespace-nowrap font-medium">Cetak</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
      </div>

      <Modal open={modalAdd} onClose={() => setModalAdd(false)} title="Buat Tagihan Pembayaran" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pasien <span className="text-red-500">*</span></label>
            <select value={form.pasienId} onChange={(e) => setForm({ ...form, pasienId: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option value="">-- Pilih Pasien --</option>
              {data.pasien.map((p) => <option key={p.id} value={p.id}>{p.namaLengkap}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Pendaftaran <span className="text-red-500">*</span></label>
            <select value={form.pendaftaranId} onChange={(e) => setForm({ ...form, pendaftaranId: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option value="">-- Pilih Pendaftaran --</option>
              {data.pendaftaran.filter((p) => !form.pasienId || p.pasienId === form.pasienId).map((p) => <option key={p.id} value={p.id}>{p.nomorPendaftaran} - {formatTanggalPendek(p.tanggal)}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Biaya Pemeriksaan", "biayaPemeriksaan" as const],
              ["Biaya Obat", "biayaObat" as const],
              ["Biaya Tambahan", "biayaTambahan" as const],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                <input type="number" value={form[key]} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" min={0} />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Metode Pembayaran</label>
            <select value={form.metodePembayaran} onChange={(e) => setForm({ ...form, metodePembayaran: e.target.value as "Tunai" | "Transfer" | "Kartu" })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option>Tunai</option><option>Transfer</option><option>Kartu</option>
            </select>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl flex items-center justify-between">
            <span className="font-semibold text-gray-700">Total Pembayaran</span>
            <span className="text-xl font-bold text-blue-700">{formatRupiah(total)}</span>
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setModalAdd(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50">Batal</button>
            <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Buat Tagihan</button>
          </div>
        </div>
      </Modal>

      <Modal open={!!modalDetail} onClose={() => setModalDetail(null)} title="Detail Pembayaran" size="sm">
        {modalDetail && (() => {
          const pasien = data.pasien.find((p) => p.id === modalDetail.pasienId);
          return (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <p className="font-mono text-sm text-blue-600 font-bold">{modalDetail.nomorPembayaran}</p>
                <p className="font-bold text-gray-900 mt-0.5">{pasien?.namaLengkap}</p>
                <Badge variant={statusPembayaranVariant(modalDetail.status)} className="mt-2">{modalDetail.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  ["Biaya Pemeriksaan", formatRupiah(modalDetail.biayaPemeriksaan)],
                  ["Biaya Obat", formatRupiah(modalDetail.biayaObat)],
                  ["Biaya Tambahan", formatRupiah(modalDetail.biayaTambahan)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-gray-600">
                    <span>{label}</span><span>{value}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span><span className="text-blue-700">{formatRupiah(modalDetail.totalPembayaran)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><p className="text-xs text-gray-400">Metode</p><p className="font-medium">{modalDetail.metodePembayaran}</p></div>
                <div><p className="text-xs text-gray-400">Tgl. Bayar</p><p className="font-medium">{modalDetail.tanggalPembayaran ? formatTanggalPendek(modalDetail.tanggalPembayaran) : "-"}</p></div>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
