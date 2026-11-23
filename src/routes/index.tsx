import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingPage })

const goats = [
  { name: 'Jawarandu', weight: '28–34 kg', price: 'Rp 2.850.000', tag: 'Banyak pilihan', color: 'sand' },
  { name: 'Etawa', weight: '32–40 kg', price: 'Rp 3.750.000', tag: 'Postur istimewa', color: 'olive' },
  { name: 'Kambing Jawa', weight: '25–30 kg', price: 'Rp 2.500.000', tag: 'Pilihan hemat', color: 'clay' },
]

function GoatIllustration() {
  return (
    <svg aria-hidden="true" viewBox="0 0 460 340" fill="none" className="hero-goat">
      <ellipse cx="243" cy="300" rx="167" ry="17" fill="#294638" fillOpacity=".12" />
      <path d="M124 145c11-42 57-70 122-68 69 2 119 32 124 82l-13 61c-12 23-40 36-82 37l-139-5c-27-4-42-20-41-44l29-63Z" fill="#F5EBDD" />
      <path d="M339 137c15-20 42-27 60-13 16 12 19 37 9 58l-28 39-38-8-17-35 14-41Z" fill="#EFE4D4" />
      <path d="m369 130 6-32c2-8 9-10 12-2l6 34m-46 7-13-26c-4-7-11-5-11 3l3 32" stroke="#765C43" strokeWidth="8" strokeLinecap="round" />
      <path d="M398 180c17 6 28 17 25 27-3 11-24 15-47 10l-20-10 13-32 29 5Z" fill="#C98563" />
      <circle cx="383" cy="158" r="4" fill="#293B2F" />
      <path d="M159 224v58m54-54v56m104-57v56m47-65v66" stroke="#765C43" strokeWidth="13" strokeLinecap="round" />
      <path d="M146 284h25m30 0h24m91 0h22m22 0h22" stroke="#293B2F" strokeWidth="7" strokeLinecap="round" />
      <path d="M124 147c-16-7-28-19-28-30 0-7 8-10 14-6l26 18m195-29c22 12 39 29 46 49" stroke="#765C43" strokeWidth="8" strokeLinecap="round" />
      <path d="M174 95c27-14 59-17 83-12" stroke="white" strokeOpacity=".75" strokeWidth="5" strokeLinecap="round" />
      <path d="M74 260c9-17 18-17 27 0m258 10c9-17 18-17 27 0M55 216c7-14 15-14 22 0" stroke="#78916A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="89" cy="112" r="5" fill="#D6A35E" /><circle cx="411" cy="83" r="4" fill="#D6A35E" />
    </svg>
  )
}

function LandingPage() {
  const [active, setActive] = useState('Semua')
  const [showInfo, setShowInfo] = useState(false)
  const categories = ['Semua', 'Jawarandu', 'Etawa', 'Kambing Jawa']
  const visibleGoats = active === 'Semua' ? goats : goats.filter((goat) => goat.name === active)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <nav className="site-nav wrap" aria-label="Navigasi utama">
        <a className="brand" href="#beranda"><span className="brand-mark">B</span><span>Bumi<span className="brand-light">Ternak</span><small>TERNAK PILIHAN, HATI TENANG</small></span></a>
        <div className="nav-links"><a href="#katalog">Katalog</a><a href="#tentang">Tentang kami</a><a className="nav-contact" href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20kambing" target="_blank" rel="noreferrer">Hubungi kami <span>↗</span></a></div>
      </nav>

      <section className="hero wrap" id="beranda">
        <div className="hero-copy" data-reveal="left">
          <div className="eyebrow"><span className="eyebrow-dot" /> PILIHAN BAIK, IBADAH TENANG</div>
          <h1>Kurban yang baik<br />dimulai dari <em>pilihan.</em></h1>
          <p className="hero-description">Kambing sehat dan terawat, dipilih dengan hati-hati. Kami bantu dari memilih hingga hari penyerahan.</p>
          <div className="hero-actions"><a className="button button-primary" href="#katalog">Lihat katalog <span>↓</span></a><a className="text-link" href="#tentang">Kenali kami <span>↗</span></a></div>
          <div className="hero-note"><span className="check-icon">✓</span><span>Harga sudah termasuk perawatan dan persiapan hingga H-1 Iduladha</span></div>
        </div>
        <div className="hero-art" data-reveal="right"><div className="art-sun" /><div className="art-label"><span className="label-star">✳</span><span>Dirawat dengan baik,<br />diserahkan dengan amanah.</span></div><GoatIllustration /><span className="art-caption">Dipelihara dengan penuh perhatian</span></div>
      </section>

      <section className="choice-strip wrap" aria-label="Pilihan layanan">
        <a className="choice-card" href="#katalog" data-reveal="up"><span className="choice-number">01 / PEMBELI</span><span className="choice-main"><span className="choice-icon">↗</span><span><strong>Lihat katalog kambing</strong><small>Pilih jenis, lihat bobot dan harga</small></span><span className="choice-arrow">→</span></span></a>
        <a className="choice-card choice-admin" href="/admin" data-reveal="up"><span className="choice-number">02 / PENGELOLA</span><span className="choice-main"><span className="choice-icon">⌂</span><span><strong>Portal pengelola</strong><small>Masuk untuk mengelola peternakan</small></span><span className="choice-arrow">→</span></span></a>
      </section>

      <section className="catalog-section" id="katalog">
        <div className="wrap">
          <div className="section-heading" data-reveal="up"><div><div className="eyebrow">KATALOG PILIHAN</div><h2>Temukan yang tepat.</h2></div><p>Setiap kambing dirawat dan diperiksa.<br />Harga sudah termasuk perawatan hingga H-1 Iduladha.</p></div>
          <div className="filters" role="group" aria-label="Filter jenis kambing">{categories.map((category) => <button key={category} aria-pressed={active === category} className={active === category ? 'filter active' : 'filter'} onClick={() => setActive(category)}>{category}</button>)}</div>
          <div className="goat-grid">{visibleGoats.map((goat, index) => <article className="goat-card" data-reveal="up" key={goat.name} style={{ '--reveal-delay': `${index * 110}ms` } as React.CSSProperties}><div className={`goat-visual ${goat.color}`}><span className="goat-tag">{goat.tag}</span><span className="goat-silhouette" aria-hidden="true">🐐</span><span className="goat-index">0{index + 1}</span></div><div className="goat-info"><div className="goat-name-line"><h3>{goat.name}</h3><span className="available"><i /> Tersedia</span></div><div className="goat-detail"><span>Bobot perkiraan</span><strong>{goat.weight}</strong></div><div className="goat-price-line"><div><small>Harga mulai</small><strong>{goat.price}</strong></div><a aria-label={`Pesan ${goat.name} lewat WhatsApp`} className="order-button" href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya tertarik dengan kambing ${goat.name}. Boleh minta informasi lebih lanjut?`)}`} target="_blank" rel="noreferrer">Pesan ↗</a></div></div></article>)}</div>
          <p className="catalog-footnote">Bobot merupakan perkiraan dan dapat berbeda untuk setiap kambing. Hubungi kami untuk informasi stok dan pilihan yang tersedia.</p>
        </div>
      </section>

      <section className="about-section wrap" id="tentang" data-reveal="up"><div className="about-mark" aria-hidden="true">✳</div><div className="about-copy"><div className="eyebrow">TENTANG BUMI TERNAK</div><h2>Merawat hewan,<br /><em>menjaga amanah.</em></h2><p>Kami memulai Bumi Ternak dengan keyakinan sederhana: ibadah yang baik berawal dari hewan yang sehat dan perawatan yang sungguh-sungguh. Kami mendampingi keluarga memilih kambing kurban maupun aqiqah, dengan informasi yang jelas dan pelayanan yang hangat.</p><button className="about-toggle" aria-expanded={showInfo} onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Tutup cerita kami' : 'Baca cerita kami'} <span>{showInfo ? '−' : '+'}</span></button>{showInfo && <div className="history-panel"><h3>Kurban &amp; aqiqah, dengan tenang</h3><p>Kurban adalah ibadah berbagi yang mengajarkan kepedulian. Aqiqah menjadi ungkapan syukur keluarga atas kelahiran buah hati. Apa pun kebutuhannya, kami membantu memilih kambing yang sesuai, menjelaskan bobot dan kondisinya, serta mempersiapkannya dengan baik menjelang hari pelaksanaan.</p><p>Pengelolaan ternak kami juga mencakup pencatatan kesehatan, jadwal vaksinasi, ketersediaan pakan dan air minum agar setiap hewan memperoleh perhatian yang layak.</p></div>}</div><div className="about-stamp"><span>AMANAH</span><span className="stamp-star">✳</span><span>SEJAK AWAL</span></div></section>

      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#beranda"><span className="brand-mark">B</span><span>Bumi<span className="brand-light">Ternak</span><small>TERNAK PILIHAN, HATI TENANG</small></span></a><p>Semoga setiap pilihan membawa kebaikan.</p><a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">Tanya lewat WhatsApp ↗</a><span className="copyright">© 2026 Bumi Ternak</span></div></footer>
    </main>
  )
}
