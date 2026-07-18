import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, User } from "lucide-react";
import { useAppData } from "../hooks/useAppData";
import { Badge } from "../components/ui/Badge";
import { Modal, ConfirmDialog } from "../components/ui/Modal";
import { Pagination } from "../components/ui/Pagination";
import { formatTanggal, generateId, generateNomor, hitungUsia } from "../utils/format";
import type { Pasien } from "../types";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 8;
const emptyForm: Omit<Pasien, "id" | "nomorRekamMedis" | "createdAt"> = {
  nik: "", namaLengkap: "", tempatLahir: "", tanggalLahir: "",
  jenisKelamin: "Laki-laki", golonganDarah: "A", nomorTelepon: "",
  email: "", alamat: "", alergi: "", kontakDarurat: "",
};

export default function PasienPage() {
  const { data, updateData } = useAppData();
  const [search, setSearch] = useState("");
  const [filterJK, setFilterJK] = useState("");
  const [filterGol, setFilterGol] = useState("");
  const [page, setPage] = useState(1);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDetail, setModalDetail] = useState<Pasien | null>(null);
  const [modalEdit, setModalEdit] = useState<Pasien | null>(null);
  const [modalDelete, setModalDelete] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = data.pasien.filter((p) => {
    const matchSearch = p.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
      p.nomorRekamMedis.toLowerCase().includes(search.toLowerCase()) ||
      p.nik.includes(search);
    const matchJK = !filterJK || p.jenisKelamin === filterJK;
    const matchGol = !filterGol || p.golonganDarah === filterGol;
    return matchSearch && matchJK && matchGol;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAdd = () => {
    if (!form.namaLengkap || !form.nik || !form.tanggalLahir || !form.nomorTelepon) {
      toast.error("Harap lengkapi semua field yang wajib diisi."); return;
    }
    const newPasien: Pasien = {
      ...form,
      id: generateId(),
      nomorRekamMedis: generateNomor("RM", data.pasien.map((p) => p.nomorRekamMedis)),
      createdAt: new Date().toISOString().split("T")[0],
    };
    updateData({ pasien: [...data.pasien, newPasien] });
    toast.success("Data pasien berhasil ditambahkan.");
    setModalAdd(false);
    setForm(emptyForm);
  };

  const handleEdit = () => {
    if (!modalEdit) return;
    if (!form.namaLengkap || !form.nik) { toast.error("Data tidak lengkap."); return; }
    const updated = data.pasien.map((p) => p.id === modalEdit.id ? { ...modalEdit, ...form } : p);
    updateData({ pasien: updated });
    toast.success("Data pasien berhasil diperbarui.");
    setModalEdit(null);
  };

  const handleDelete = (id: string) => {
    updateData({ pasien: data.pasien.filter((p) => p.id !== id) });
    toast.success("Data pasien berhasil dihapus.");
  };

  const openAdd = () => { setForm(emptyForm); setModalAdd(true); };
  const openEdit = (p: Pasien) => { setForm({ nik: p.nik, namaLengkap: p.namaLengkap, tempatLahir: p.tempatLahir, tanggalLahir: p.tanggalLahir, jenisKelamin: p.jenisKelamin, golonganDarah: p.golonganDarah, nomorTelepon: p.nomorTelepon, email: p.email, alamat: p.alamat, alergi: p.alergi, kontakDarurat: p.kontakDarurat }); setModalEdit(p); };

  const FormPasien = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
          <input value={form.namaLengkap} onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Nama lengkap pasien" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">NIK <span className="text-red-500">*</span></label>
          <input value={form.nik} onChange={(e) => setForm({ ...form, nik: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="16 digit NIK" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon <span className="text-red-500">*</span></label>
          <input value={form.nomorTelepon} onChange={(e) => setForm({ ...form, nomorTelepon: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="08xxxxxxxxx" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tempat Lahir</label>
          <input value={form.tempatLahir} onChange={(e) => setForm({ ...form, tempatLahir: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Kota kelahiran" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
          <input type="date" value={form.tanggalLahir} onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Jenis Kelamin</label>
          <select value={form.jenisKelamin} onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value as "Laki-laki" | "Perempuan" })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option>Laki-laki</option><option>Perempuan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Golongan Darah</label>
          <select value={form.golonganDarah} onChange={(e) => setForm({ ...form, golonganDarah: e.target.value as "A" | "B" | "AB" | "O" })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option>A</option><option>B</option><option>AB</option><option>O</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="email@domain.com" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat</label>
          <textarea rows={2} value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none" placeholder="Alamat lengkap" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Alergi</label>
          <input value={form.alergi} onChange={(e) => setForm({ ...form, alergi: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Tulis '-' jika tidak ada" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kontak Darurat</label>
          <input value={form.kontakDarurat} onChange={(e) => setForm({ ...form, kontakDarurat: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Nama - Nomor telepon" />
        </div>
      </div>
      <div className="flex gap-3 pt-2 justify-end">
        <button onClick={() => { setModalAdd(false); setModalEdit(null); }} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">Batal</button>
        <button onClick={modalEdit ? handleEdit : handleAdd} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
          {modalEdit ? "Simpan Perubahan" : "Tambah Pasien"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Pasien</h1>
          <p className="text-gray-500 text-sm mt-0.5">{data.pasien.length} pasien terdaftar</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} />Tambah Pasien
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[180px]">
            <Search size={14} className="text-gray-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Cari nama, rekam medis, NIK..." className="bg-transparent text-sm outline-none w-full text-gray-700" />
          </div>
          <select value={filterJK} onChange={(e) => { setFilterJK(e.target.value); setPage(1); }} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400">
            <option value="">Semua Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <select value={filterGol} onChange={(e) => { setFilterGol(e.target.value); setPage(1); }} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400">
            <option value="">Semua Golongan Darah</option>
            {["A", "B", "AB", "O"].map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>

        {paged.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <User size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Tidak ada data pasien</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50">
                  {["No. RM", "Nama Pasien", "NIK", "Jenis Kelamin", "Tgl. Lahir", "Telepon", "Gol. Darah", "Aksi"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paged.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-blue-600 font-medium whitespace-nowrap">{p.nomorRekamMedis}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{p.namaLengkap}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.nik}</td>
                    <td className="px-4 py-3">
                      <Badge variant={p.jenisKelamin === "Laki-laki" ? "info" : "secondary"}>{p.jenisKelamin}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatTanggal(p.tanggalLahir)}</td>
                    <td className="px-4 py-3 text-gray-600">{p.nomorTelepon}</td>
                    <td className="px-4 py-3">
                      <span className="bg-red-50 text-red-700 border border-red-100 text-xs font-bold px-2 py-0.5 rounded">{p.golonganDarah}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalDetail(p)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Detail"><Eye size={14} /></button>
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors" title="Edit"><Pencil size={14} /></button>
                        <button onClick={() => setModalDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors" title="Hapus"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
      </div>

      <Modal open={modalAdd} onClose={() => setModalAdd(false)} title="Tambah Pasien Baru" size="lg">
        <FormPasien />
      </Modal>

      <Modal open={!!modalEdit} onClose={() => setModalEdit(null)} title="Edit Data Pasien" size="lg">
        <FormPasien />
      </Modal>

      <Modal open={!!modalDetail} onClose={() => setModalDetail(null)} title="Detail Pasien" size="lg">
        {modalDetail && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                <User size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{modalDetail.namaLengkap}</h3>
                <p className="text-blue-600 font-mono text-sm">{modalDetail.nomorRekamMedis}</p>
                <p className="text-gray-500 text-sm">{hitungUsia(modalDetail.tanggalLahir)} tahun · {modalDetail.jenisKelamin}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["NIK", modalDetail.nik], ["Gol. Darah", modalDetail.golonganDarah],
                ["Tempat Lahir", modalDetail.tempatLahir], ["Tanggal Lahir", formatTanggal(modalDetail.tanggalLahir)],
                ["Telepon", modalDetail.nomorTelepon], ["Email", modalDetail.email || "-"],
                ["Alergi", modalDetail.alergi || "-"], ["Kontak Darurat", modalDetail.kontakDarurat || "-"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                  <p className="text-sm text-gray-800 font-medium">{value}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-xs text-gray-400 font-medium mb-0.5">Alamat</p>
                <p className="text-sm text-gray-800">{modalDetail.alamat || "-"}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!modalDelete}
        onClose={() => setModalDelete(null)}
        onConfirm={() => { handleDelete(modalDelete!); setModalDelete(null); }}
        title="Hapus Data Pasien"
        message="Apakah Anda yakin ingin menghapus data pasien ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
