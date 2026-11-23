import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { archiveGoat, createGoat, listGoats, updateGoat } from '#/modules/goats/goat.functions'

export const Route = createFileRoute('/admin')({
  loader: () => listGoats(),
  component: AdminPage,
})

const emptyForm = { tag: '', typeName: '', sex: '' as '' | 'MALE' | 'FEMALE', arrivalAt: new Date().toISOString().slice(0, 10), initialWeightKg: '', source: '', notes: '' }

function AdminPage() {
  const initialGoats = Route.useLoaderData()
  const [goats, setGoats] = useState(initialGoats)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState('')
  const available = goats.filter((goat) => goat.status === 'AVAILABLE')
  const filtered = goats.filter((goat) => `${goat.tag} ${goat.type.name} ${goat.status}`.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-admin-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  async function refresh() { setGoats(await listGoats()) }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      const data = { ...form, sex: form.sex || undefined, initialWeightKg: Number(form.initialWeightKg) }
      if (editingId) await updateGoat({ data: { ...data, id: editingId } })
      else await createGoat({ data })
      setNotice(editingId ? 'Perubahan data kambing berhasil disimpan.' : 'Kambing berhasil ditambahkan ke daftar.')
      setForm(emptyForm)
      setEditingId(null)
      await refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Gagal menyimpan data kambing')
    } finally { setPending(false) }
  }

  function edit(goat: (typeof goats)[number]) {
    setEditingId(goat.id)
    setForm({ tag: goat.tag, typeName: goat.type.name, sex: goat.sex === 'MALE' || goat.sex === 'FEMALE' ? goat.sex : '', arrivalAt: new Date(goat.arrivalAt).toISOString().slice(0, 10), initialWeightKg: String(goat.initialWeightKg), source: goat.source ?? '', notes: goat.notes ?? '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function archive(id: string) {
    if (!window.confirm('Arsipkan data kambing ini? Data tidak dihapus permanen.')) return
    setError('')
    try { await archiveGoat({ data: { id } }); setNotice('Data kambing berhasil diarsipkan.'); await refresh() }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Gagal mengarsipkan kambing') }
  }

  return <main className="admin-page">
    <header className="admin-top"><a className="admin-brand" href="/">← <span>Bumi<span>Ternak</span></span></a><span className="admin-role">SHOWROOM · PENGELOLA</span></header>
    <div className="admin-wrap">
      <div className="admin-heading" data-admin-reveal><div><div className="eyebrow">RUANG OPERASIONAL</div><h1>Selamat datang.</h1><p>Kelola data kambing dan pantau stok showroom.</p></div><a className="admin-back" href="/">Lihat halaman utama ↗</a></div>
      {notice && <p className="admin-notice" role="status">✓ {notice}<button type="button" aria-label="Tutup pemberitahuan" onClick={() => setNotice('')}>×</button></p>}
      <section className="admin-stats">{[['STOK TERSEDIA', available.length, 'kambing di showroom'], ['JUMLAH TERCATAT', goats.length, 'termasuk yang telah keluar'], ['TERAKHIR DIPERBARUI', new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }), 'data dimuat dari database']].map(([title, value, detail], index) => <article data-admin-reveal key={title} style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}><span>{title}</span><strong>{value}</strong><small>{detail}</small></article>)}</section>
      <section className="admin-content">
        <form className="goat-form" onSubmit={submit} data-admin-reveal>
          <div className="admin-section-title"><div><span className="eyebrow">DATA TERNAK</span><h2>{editingId ? 'Ubah data kambing' : 'Tambah kambing'}</h2></div><span className="form-step">{editingId ? 'EDIT' : 'FORM 01'}</span></div>
          <label>ID kambing<input required maxLength={50} value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Contoh: BT-2026-001" /></label>
          <div className="form-pair"><label>Jenis / ras<input required value={form.typeName} onChange={(e) => setForm({ ...form, typeName: e.target.value })} placeholder="Contoh: Jawarandu" /></label><label>Jenis kelamin<select value={form.sex} onChange={(e) => setForm({ ...form, sex: e.target.value as typeof form.sex })}><option value="">Belum diketahui</option><option value="MALE">Jantan</option><option value="FEMALE">Betina</option></select></label></div>
          <div className="form-pair"><label>Tanggal masuk<input required type="date" value={form.arrivalAt} onChange={(e) => setForm({ ...form, arrivalAt: e.target.value })} /></label><label>Bobot awal (kg)<input required type="number" min="0.1" step="0.1" value={form.initialWeightKg} onChange={(e) => setForm({ ...form, initialWeightKg: e.target.value })} placeholder="Contoh: 32.5" /></label></div>
          <label>Asal kambing <span className="optional">(opsional)</span><input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="Nama peternak atau lokasi" /></label>
          <label>Catatan <span className="optional">(opsional)</span><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Informasi tambahan tentang kambing" /></label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <div className="form-buttons"><button className="admin-submit" disabled={pending}>{pending ? 'Menyimpan…' : editingId ? 'Simpan perubahan →' : 'Simpan kambing →'}</button>{editingId && <button type="button" className="admin-cancel" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Batal</button>}</div>
          <p className="form-hint">* Foto transaksi masuk dan pencatatan pengguna akan dilengkapi pada alur stok masuk.</p>
        </form>
        <section className="goat-list" data-admin-reveal><div className="admin-section-title"><div><span className="eyebrow">INVENTARIS</span><h2>Daftar kambing <span className="count-pill">{filtered.length}</span></h2></div></div><label className="search-box"><span>⌕</span><input aria-label="Cari kambing" type="search" placeholder="Cari ID, jenis, atau status" value={filter} onChange={(e) => setFilter(e.target.value)} /></label>
          {filtered.length === 0 ? <div className="empty-state"><span>🐐</span><strong>Belum ada kambing</strong><p>Tambahkan data pertama melalui formulir.</p></div> : <div className="table-wrap"><table><thead><tr><th>ID / JENIS</th><th>BOBOT</th><th>TGL MASUK</th><th>STATUS</th><th>AKSI</th></tr></thead><tbody>{filtered.map((goat) => <tr key={goat.id}><td><strong>{goat.tag}</strong><small>{goat.type.name}</small></td><td>{Number(goat.currentWeightKg ?? goat.initialWeightKg).toFixed(1)} kg</td><td>{new Date(goat.arrivalAt).toLocaleDateString('id-ID')}</td><td><span className={`status-pill ${goat.status === 'AVAILABLE' ? 'status-available' : 'status-other'}`}>{goat.status === 'AVAILABLE' ? 'Tersedia' : 'Keluar'}</span></td><td><div className="row-actions"><button onClick={() => edit(goat)}>Edit</button><button onClick={() => void archive(goat.id)}>Arsipkan</button></div></td></tr>)}</tbody></table></div>}
        </section>
      </section>
      <p className="admin-disclaimer">MVP showroom · Pencatatan stok yang lengkap harus melalui transaksi masuk/keluar agar riwayat dan audit tetap akurat.</p>
    </div>
  </main>
}
