import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingPage })

const goats = [
  { name: 'Domba garut', weight: '28–34 kg', price: 'Rp 2.850.000', tag: 'Banyak pilihan', color: 'sand', image: '/images/domba-garut.jpg' },
  {  name: 'Kambing Atawa', weight: '25–30 kg', price: 'Rp 2.900.000', tag: 'Pilihan hemat', color: 'clay', image: '/images/Screenshot 2026-11-24 145929.png' },
  { name: 'Kambing Jawa', weight: '25–30 kg', price: 'Rp 2.500.000', tag: 'Pilihan hemat', color: 'clay', image: '/images/kambing-jawa.jpg' },
]

function GoatIllustration() {
  const [activeVideo, setActiveVideo] = useState(0)
  const videos = [
    { src: '/videos/kambing.mp4', caption: 'Dirawat sepenuh hati' },
    { src: '/videos/kambing-2.mp4', caption: 'Sehat dan terawat' },
  ]

  useEffect(() => {
    const timer = window.setInterval(() => setActiveVideo((current) => (current + 1) % videos.length), 7000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="hero-media-grid">
      {videos.map((video, index) => (
        <figure className={`hero-media-card ${index === activeVideo ? 'hero-media-card-main' : 'hero-media-card-side'} ${index === (activeVideo + 1) % videos.length ? 'hero-media-card-next' : ''}`} key={video.src}>
          <video autoPlay muted loop playsInline preload="metadata" aria-label={`Video kambing: ${video.caption}`}>
            <source src={video.src} type="video/mp4" />
          </video>
          <figcaption><span>0{index + 1}</span> {video.caption}</figcaption>
        </figure>
      ))}
      <div className="hero-video-dots" aria-label={`Video ${activeVideo + 1} dari ${videos.length}`}>
        {videos.map((video, index) => <button key={video.src} type="button" aria-label={`Tampilkan video ${index + 1}`} aria-current={activeVideo === index ? 'true' : undefined} onClick={() => setActiveVideo(index)} />)}
      </div>
    </div>
  )
}

function LandingPage() {
  const [showInfo, setShowInfo] = useState(false)

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
        <a className="brand" href="#beranda"><span className="brand-mark"><img src="https://www.shutterstock.com/image-vector/goat-animal-farm-icon-260nw-631291580.jpg" alt="" /></span><span>Showroam<span className="brand-light">Tanduk</span><small>TERNAK PILIHAN, HATI TENANG</small></span></a>
        <div className="nav-links"><a href="#katalog">Katalog</a><a href="#tentang">Tentang kami</a><a className="nav-contact" href="https://wa.me/6283156787434?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20kambing" target="_blank" rel="noreferrer">Hubungi kami <span>↗</span></a></div>
      </nav>

      <section className="hero wrap" id="beranda">
        <div className="hero-copy" data-reveal="left">
          <div className="eyebrow"><span className="eyebrow-dot" /> PILIHAN BAIK, IBADAH TENANG</div>
          <h1>Kurban yang baik<br />dimulai dari <em>pilihan.</em></h1>
          <p className="hero-description">Kambing sehat dan terawat, dipilih dengan hati-hati. Kami bantu dari memilih hingga hari penyerahan.</p>
          <div className="hero-actions"><a className="button button-primary" href="#katalog">Lihat katalog <span>↓</span></a><a className="text-link" href="#tentang">Kenali kami <span>↗</span></a></div>
          <div className="hero-note"><span className="check-icon">✓</span><span>Harga sudah termasuk perawatan dan persiapan hingga H-1 Iduladha</span></div>
        </div>
        <div className="hero-art" data-reveal="right"><div className="art-sun" /><div className="art-label"><span className="label-star"></span><span>Dirawat dengan baik,<br />diserahkan dengan amanah.</span></div><GoatIllustration /><span className="art-caption">Dipelihara dengan penuh perhatian</span></div>
      </section>

      <section className="choice-strip wrap" aria-label="Pilihan layanan">
        <a className="choice-card" href="#katalog" data-reveal="up"><span className="choice-number"></span><span className="choice-main"><span className="choice-icon">↗</span><span><strong>Lihat katalog kambing</strong><small>Pilih jenis, lihat bobot dan harga</small></span><span className="choice-arrow">→</span></span></a>
        {/* <a className="choice-card choice-admin" href="/admin" data-reveal="up"><span className="choice-number">02 / PENGELOLA</span><span className="choice-main"><span className="choice-icon">⌂</span><span><strong>Portal pengelola</strong><small>Masuk untuk mengelola peternakan</small></span><span className="choice-arrow">→</span></span></a> */}
      </section>

      <section className="catalog-section" id="katalog">
        <div className="wrap">
          <div className="section-heading" data-reveal="up"><div><div className="eyebrow">KATALOG PILIHAN</div><h2>Temukan yang tepat.</h2></div><p>Setiap kambing dirawat dan diperiksa.<br />Harga sudah termasuk perawatan hingga H-1 Iduladha.</p></div>
          <div className="goat-grid">{goats.map((goat, index) => <article className="goat-card" data-reveal="up" key={goat.name} style={{ '--reveal-delay': `${index * 110}ms` } as React.CSSProperties}><div className={`goat-visual ${goat.color}`}><img className="goat-photo" src={goat.image} alt={goat.name} loading="lazy" width="600" height="450" /><span className="goat-tag">{goat.tag}</span><span className="goat-index">0{index + 1}</span></div><div className="goat-info"><div className="goat-name-line"><h3>{goat.name}</h3><span className="available"><i /> Tersedia</span></div><div className="goat-detail"><span>Bobot perkiraan</span><strong>{goat.weight}</strong></div><div className="goat-price-line"><div><small>Harga mulai</small><strong>{goat.price}</strong></div><a aria-label={`Pesan ${goat.name} lewat WhatsApp`} className="order-button" href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya tertarik dengan kambing ${goat.name}. Boleh minta informasi lebih lanjut?`)}`} target="_blank" rel="noreferrer">Pesan ↗</a></div></div></article>)}</div>
          <p className="catalog-footnote">Bobot merupakan perkiraan dan dapat berbeda untuk setiap kambing. Hubungi kami untuk informasi stok dan pilihan yang tersedia.</p>
        </div>
      </section>

      <section className="about-section wrap" id="tentang" data-reveal="up"><div className="about-mark" aria-hidden="true"><img src="https://www.shutterstock.com/image-vector/goat-animal-farm-icon-260nw-631291580.jpg" alt="" /></div><div className="about-copy"><div className="eyebrow">Tentang Showroam Tanduk</div><h2>Merawat hewan,<br /><em>menjaga amanah.</em></h2><p>Kami memulai Showroam Tanduk dengan keyakinan sederhana: ibadah yang baik berawal dari hewan yang sehat dan perawatan yang sungguh-sungguh. Kami mendampingi keluarga memilih kambing kurban maupun aqiqah, dengan informasi yang jelas dan pelayanan yang hangat.</p><button className="about-toggle" aria-expanded={showInfo} onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Tutup cerita kami' : 'Baca cerita kami'} <span>{showInfo ? '−' : '+'}</span></button>{showInfo && <div className="history-panel"><h3>Kurban &amp; aqiqah, dengan tenang</h3><p>Kurban adalah ibadah berbagi yang mengajarkan kepedulian. Aqiqah menjadi ungkapan syukur keluarga atas kelahiran buah hati. Apa pun kebutuhannya, kami membantu memilih kambing yang sesuai, menjelaskan bobot dan kondisinya, serta mempersiapkannya dengan baik menjelang hari pelaksanaan.</p><p>Pengelolaan ternak kami juga mencakup pencatatan kesehatan, jadwal vaksinasi, ketersediaan pakan dan air minum agar setiap hewan memperoleh perhatian yang layak.</p></div>}</div><div className="about-stamp"><span>AMANAH</span><span className="stamp-star">✳</span><span>SEJAK AWAL</span></div></section>

      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#beranda"><span className="brand-mark"><img src="https://www.shutterstock.com/image-vector/goat-animal-farm-icon-260nw-631291580.jpg" alt="" /></span><span>Showroam<span className="brand-light">Tanduk</span><small>TERNAK PILIHAN, HATI TENANG</small></span></a><p>Semoga setiap pilihan membawa kebaikan.</p><a href="https://wa.me/6283156787434" target="_blank" rel="noreferrer">Tanya lewat WhatsApp ↗</a><span className="copyright">© 2005 Showroam Tanduk</span></div></footer>
    </main>
  )
}
