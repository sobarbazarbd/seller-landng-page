import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const SELLER_URL = 'https://www.sobarbazarbd.com/account'
const LOGIN_URL = 'https://vendor.sobarbazarbd.com/'

/* ── Scroll animation hook ── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── TOPBAR ── */
function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <a href="tel:+8801713332003"><i className="ph ph-phone" /> +880 1713-332003</a>
          <a href="mailto:info@sobarbazarbd.com"><i className="ph ph-envelope-simple" /> info@sobarbazarbd.com</a>
        </div>
        <div className="topbar-right">
          <span className="topbar-tag">Trade With Trust</span>
        </div>
      </div>
    </div>
  )
}

const navLinks = [
  { label: 'কেন বিক্রেতা হবেন?', href: '#why-sell' },
  { label: 'কারা বিক্রি করতে পারে?', href: '#who-can-sell' },
  { label: 'কিভাবে শুরু করবেন', href: '#how-it-works' },
  { label: 'সুবিধাসমূহ', href: '#benefits' },
  { label: 'মূল্য পরিকল্পনা', href: '#pricing' },
  { label: 'যোগাযোগ', href: '#contact' },
]

/* ── NAVBAR ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const fn = (e) => {
      if (!e.target.closest('.navbar')) setMenuOpen(false)
    }
    document.addEventListener('click', fn)
    return () => document.removeEventListener('click', fn)
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container navbar-inner">
        <a href="/" className="navbar-logo">
          <div className="logo-img-wrap">
            <img src="/logo.png" alt="SobarBazarBD Logo" className="logo-img" />
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <a href={LOGIN_URL} className="btn btn-primary btn-sm btn-glow">
            <i className="ph ph-sign-in" />
            Seller Login
          </a>
          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="mobile-nav-link" onClick={handleNavClick}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href={SELLER_URL} className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
          <i className="ph ph-storefront" />
          Seller হোন — Free
        </a>
      </div>
    </nav>
  )
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-pattern" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="badge badge-glow">🇧🇩 Trusted Multi-Vendor Marketplace</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">আপনার পণ্য, আমাদের</span>
            <span className="hero-title-line">প্ল্যাটফর্ম —</span>
            <span className="hero-title-accent">অসীম সুযোগ।</span>
          </h1>
          <p className="hero-sub">
            বিক্রেতা হোন — <strong>SobarBazarBD</strong>
          </p>
          <p className="hero-desc">
            SobarbazarBD.com একটি আধুনিক মাল্টিভেন্ডর অনলাইন মার্কেটপ্লেস, যেখানে যে কেউ
            সহজেই অনলাইনে পণ্য বিক্রি করতে পারে। আপনি ব্যবসায়ী হোন, উদ্যোক্তা হোন, বা বাড়ি 
            থেকে ব্যবসা পরিচালনা করেন — আমরা আপনার ব্যবসাকে ডিজিটালি বৃদ্ধি করতে সাহায্য করি।
          </p>
          <div className="hero-actions">
            <a href={SELLER_URL} className="btn btn-primary btn-lg btn-glow">
              <i className="ph ph-storefront" />
              Become a Seller
            </a>
            <a href="#how-it-works" className="btn btn-glass">
              <i className="ph ph-play-circle" />
              কিভাবে শুরু করবেন
            </a>
          </div>
          <div className="hero-trust-row">
            {['সহজ ড্যাশবোর্ড', 'দেশব্যাপী ডেলিভারি'].map(t => (
              <div key={t} className="trust-chip">
                <i className="ph-fill ph-check-circle" />
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-glass-card">
            <div className="glass-card-header">
              <div className="glass-dot" />
              <span>Platform Stats</span>
            </div>
            <div className="stat-grid">
              {[
                { num: '185+', label: 'Active Stores', icon: 'ph-fill ph-storefront' },
                { num: '15K+', label: 'Customers', icon: 'ph-fill ph-users' },
                { num: '152K', label: 'Products Sold', icon: 'ph-fill ph-package' },
              ].map((s, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-icon"><i className={s.icon} /></div>
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-quote-card">
            <i className="ph-fill ph-quotes quote-icon" />
            <p>আমরা অনলাইনে আসল পণ্য সরবরাহকারীকে অগ্রাধিকার দেই কারণ আমরা আপনার প্রতি যত্নশীল।</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── MARQUEE ── */
function Marquee() {
  const items = ['🛒 ফ্রি রেজিস্ট্রেশন', '📦 সহজ অর্ডার ম্যানেজমেন্ট', '🚚 দেশব্যাপী ডেলিভারি', '💳 নিরাপদ পেমেন্ট', '📣 মার্কেটিং সাপোর্ট', '🏪 আপনার নিজস্ব শপ', '✅ ভেরিফাইড সেলার ব্যাজ', '🇧🇩 Trade With Trust']
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="marquee-item">{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── ABOUT PLATFORM ── */
function AboutPlatform() {
  const ref = useReveal()
  return (
    <section id="why-sell" className="section" ref={ref}>
      <div className="container">
        <Reveal>
          <div className="about-grid">
            <div className="about-left">
              <span className="badge">আমাদের সম্পর্কে</span>
              <h2 className="section-title">কেন SobarbazarBD-এ <br />বিক্রেতা হওয়া উচিত?</h2>
              <p className="about-text">
                SobarbazarBD একটি অনলাইন সুপারশপ এবং মাল্টিভেন্ডর স্টোর, যেখানে হাজার হাজার গ্রাহক 
                তাদের দৈনন্দিন এবং বিশেষ পণ্য খুঁজে পান। আমাদের প্ল্যাটফর্মে যোগ দিয়ে, আপনি নতুন 
                গ্রাহকের কাছে সহজেই পৌঁছাতে পারেন এবং প্রযুক্তিগত জটিলতা নিয়ে চিন্তা না করে আপনার 
                বিক্রি বাড়াতে পারেন।
              </p>
              <a href={SELLER_URL} className="btn btn-primary btn-glow" style={{ marginTop: 24 }}>
                <i className="ph ph-arrow-right" />
                এখনই শুরু করুন
              </a>
            </div>
            <div className="about-right">
              <div className="about-features">
                {[
                  { icon: 'ph-fill ph-users-three', title: 'বিশাল গ্রাহক পরিসর', text: 'প্রতিদিন হাজার হাজার সক্রিয় ক্রেতা পণ্য খুঁজছে।' },
                  { icon: 'ph-fill ph-code', title: 'শূন্য প্রযুক্তিগত ঝামেলা', text: 'কোনো কোডিং বা টেক দক্ষতার দরকার নেই।' },
                  { icon: 'ph-fill ph-shield-check', title: 'বিশ্বস্ত প্ল্যাটফর্ম', text: 'গ্রাহকরা আমাদের বিশ্বাস করেন কারণ আমরা আসল পণ্যকে অগ্রাধিকার দেই।' },
                  { icon: 'ph-fill ph-chart-line-up', title: 'ব্যবসা বৃদ্ধির সমর্থন', text: 'মার্কেটিং এক্সপোজার, প্রচারণা এবং বিক্রি বাড়ানোর টুলস।' },
                ].map((f, i) => (
                  <div key={i} className="about-feat-card">
                    <div className="about-feat-icon"><i className={f.icon} /></div>
                    <div>
                      <h5>{f.title}</h5>
                      <p>{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── WHO CAN SELL ── */
const sellerTypes = [
  { icon: 'ph-fill ph-warehouse', title: 'হোলসেলর এবং খুচরা বিক্রেতারা', desc: 'আপনার বিদ্যমান ব্যবসাকে অনলাইনে সম্প্রসারণ করুন।', color: '#299e60' },
  { icon: 'ph-fill ph-globe-simple', title: 'অফলাইন, অনলাইন ও ফেসবুক ভিত্তিক বিক্রেতারা', desc: 'সোশ্যাল মিডিয়া থেকে পেশাদার বিক্রয় প্ল্যাটফর্মে আসুন।', color: '#2563eb' },
  { icon: 'ph-fill ph-hand-heart', title: 'বাড়িতে তৈরি এবং হ্যান্ডমেড পণ্য বিক্রেতারা', desc: 'আপনার হস্তশিল্প পণ্য বৃহত্তর দর্শকদের কাছে পৌছান।', color: '#e85d04' },
  { icon: 'ph-fill ph-buildings', title: 'ব্র্যান্ড ও ডিস্ট্রিবিউটররা', desc: 'আপনার ব্র্যান্ডেড পণ্য সরাসরি গ্রাহকদের কাছে পৌঁছে দিন।', color: '#7c3aed' },
  { icon: 'ph-fill ph-rocket-launch', title: 'নতুন এবং উদীয়মান উদ্যোক্তারা', desc: 'SobarbazarBD হলো আপনার ব্যবসার নিখুঁত লঞ্চপ্যাড।', color: '#dc2626' },
]

function WhoCanSell() {
  return (
    <section id="who-can-sell" className="section bg-pattern">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="badge">সবার জন্য উন্মুক্ত</span>
            <h2 className="section-title">SobarbazarBD-এ কে বিক্রি করতে পারে?</h2>
            <p className="section-desc">আপনি বড় ব্যবসায়ী হোন বা সবে শুরু করছেন — সবাইকে স্বাগতম।</p>
          </div>
        </Reveal>
        <div className="who-grid">
          {sellerTypes.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="who-card" style={{ '--accent': item.color }}>
                <div className="who-card-glow" />
                <div className="who-icon">
                  <i className={item.icon} />
                </div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── STEPS ── */
const steps = [
  { num: '01', icon: 'ph-fill ph-cursor-click', title: "Became A Seller বাটনে ক্লিক করুন", desc: 'আমাদের ওয়েবসাইটে গিয়ে Become a Seller বাটনে ক্লিক করুন।' },
  { num: '02', icon: 'ph-fill ph-user-plus', title: 'Create An Account বাটনে ক্লিক করুন', desc: 'আপনার ইমেইল বা ফোন নম্বর দিয়ে সেলার একাউন্ট তৈরি করুন।' },
  { num: '03', icon: 'ph-fill ph-note-pencil', title: 'Store Registration ফর্ম পূরণ করুন', desc: 'আপনার স্টোরের নাম, ব্যবসার বিবরণ এবং সঠিক তথ্য দিয়ে পূরণ করুন।' },
  { num: '04', icon: 'ph-fill ph-paper-plane-tilt', title: 'আবেদন জমা দিন', desc: 'পর্যালোচনার জন্য আপনার আবেদন জমা দিন।' },
  { num: '05', icon: 'ph-fill ph-seal-check', title: 'অনুমোদন পান', desc: 'আমাদের টিম আপনার আবেদন যাচাই করে অনুমোদন করবে।' },
  { num: '06', icon: 'ph-fill ph-layout', title: 'সেলার ড্যাশবোর্ড অ্যাক্সেস পান', desc: 'আপনার ব্যক্তিগত সেলার ড্যাশবোর্ডে লগ ইন করুন।' },
  { num: '07', icon: 'ph-fill ph-shopping-cart', title: 'পণ্য যোগ করুন এবং বিক্রি শুরু করুন', desc: 'পণ্য আপলোড করুন, দাম নির্ধারণ করুন এবং অর্ডার গ্রহণ শুরু করুন।' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-dark">
      <div className="container">
        <Reveal>
          <div className="section-header section-header-light">
            <span className="badge badge-light">সহজ প্রক্রিয়া</span>
            <h2 className="section-title">কিভাবে SobarbazarBD-এ বিক্রেতা হওয়া যায়?</h2>
            <p className="section-desc">কেবল কয়েকটি সহজ ধাপে বিক্রেতা হোন। কোনো প্রযুক্তিগত জ্ঞানের প্রয়োজন নেই।</p>
          </div>
        </Reveal>
        <div className="steps-timeline">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="step-card">
                <div className="step-connector">
                  <div className="step-num-circle">
                    <span>{step.num}</span>
                  </div>
                  {i < steps.length - 1 && <div className="step-line" />}
                </div>
                <div className="step-content">
                  <div className="step-icon-box"><i className={step.icon} /></div>
                  <h5 className="step-title">{step.title}</h5>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── BENEFITS ── */
const benefits = [
  { icon: 'ph-fill ph-gift', title: 'ফ্রি বিক্রেতা রেজিস্ট্রেশন', desc: 'কোনো প্রাথমিক রেজিস্ট্রেশন ফি ছাড়াই বিক্রেতা হিসেবে যোগ দিন।', gradient: 'linear-gradient(135deg, #299e60, #34d399)' },
  { icon: 'ph-fill ph-storefront', title: 'আপনার নিজস্ব অনলাইন শপ', desc: 'আপনার নিজস্ব শপ নাম এবং প্রোফাইলসহ একটি বিশেষ শপ পাবেন।', gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)' },
  { icon: 'ph-fill ph-package', title: 'সহজ অর্ডার ম্যানেজমেন্ট', desc: 'একটি সহজ ড্যাশবোর্ড থেকে অর্ডার, রিটার্ন এবং স্টক পরিচালনা করুন।', gradient: 'linear-gradient(135deg, #e85d04, #fb923c)' },
  { icon: 'ph-fill ph-credit-card', title: 'নিরাপদ পেমেন্ট', desc: 'আপনার আয় নিরাপদে এবং সময়মতো পেতে পারেন।', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
  { icon: 'ph-fill ph-megaphone-simple', title: 'মার্কেটিং ও প্রমোশন', desc: 'SobarbazarBD-এর ক্যাম্পেইন এবং অফারের মাধ্যমে আপনার পণ্য প্রচার করুন।', gradient: 'linear-gradient(135deg, #dc2626, #f87171)' },
  { icon: 'ph-fill ph-truck', title: 'ডেলিভারি সিস্টেম', desc: 'আমাদের ডেলিভারি নেটওয়ার্ক ব্যবহার করে সারাদেশে পণ্য পাঠান।', gradient: 'linear-gradient(135deg, #0891b2, #22d3ee)' },
]

function Benefits() {
  return (
    <section id="benefits" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="badge">সুবিধাসমূহ</span>
            <h2 className="section-title">SobarbazarBD-এ বিক্রি করার সুবিধাসমূহ</h2>
            <p className="section-desc">একটি সফল অনলাইন ব্যবসা পরিচালনা এবং বৃদ্ধি করতে আপনার যা কিছু দরকার।</p>
          </div>
        </Reveal>
        <div className="benefits-grid">
          {benefits.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="benefit-card-v2">
                <div className="benefit-icon-v2" style={{ background: item.gradient }}>
                  <i className={item.icon} />
                </div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── WHY CHOOSE ── */
function WhyChoose() {
  const features = [
    { icon: 'ph-fill ph-seal-check', title: 'নিবন্ধন ফি নেই', desc: 'সম্পূর্ণ বিনামূল্যে শুরু করুন। কোনো লুকানো চার্জ নেই।' },
    { icon: 'ph-fill ph-truck', title: 'ডেলিভারি সিস্টেম', desc: 'নির্ভরযোগ্য এবং দ্রুত সারাদেশে ডেলিভারি।' },
    { icon: 'ph-fill ph-shield-check', title: 'পেমেন্ট নিরাপত্তা', desc: 'নিরাপদ পেমেন্ট ব্যবস্থা এবং সময়মতো পেআউট।' },
    { icon: 'ph-fill ph-megaphone', title: 'প্রচারণা ও বিজ্ঞাপন', desc: 'আমরা আপনার পণ্যের মার্কেটিং পরিচালনা করি।' },
  ]
  return (
    <section className="section bg-gradient-green">
      <div className="container">
        <Reveal>
          <div className="why-choose-grid">
            <div className="why-choose-left">
              <span className="badge badge-white">কেন আমরা?</span>
              <h2 className="section-title text-white">কেন SobarbazarBD-কে নির্বাচন করবেন?</h2>
              <p className="text-white-muted">
                SobarbazarBD শুধুমাত্র একটি অনলাইন মার্কেটপ্লেস নয় — এটি একটি সম্পূর্ণ ব্যবসায়িক সমাধান।
                আমরা বিক্রেতাদের একটি সহজ, নিরাপদ এবং স্কেলযোগ্য সিস্টেম প্রদান করি, যাতে আপনি আপনার 
                ব্যবসা বাড়ানোর উপর মনোনিবেশ করতে পারেন।
              </p>
            </div>
            <div className="why-choose-right">
              {features.map((f, i) => (
                <div key={i} className="why-feat-card">
                  <div className="why-feat-icon"><i className={f.icon} /></div>
                  <div>
                    <h5>{f.title}</h5>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── PRICING ── */
function Pricing() {
  return (
    <section id="pricing" className="section bg-dark">
      <div className="container">
        <Reveal>
          <div className="section-header section-header-light">
            <span className="badge badge-light">মূল্য পরিকল্পনা</span>
            <h2 className="section-title">আপনার পছন্দের প্ল্যান বেছে নিন</h2>
            <p className="section-desc">দুটি নমনীয় পরিকল্পনা — আপনার ব্যবসার জন্য যেটি সবচেয়ে উপযুক্ত সেটি বেছে নিন।</p>
          </div>
        </Reveal>
        <div className="pricing-grid">

          {/* Plan 1 — Annual */}
          <Reveal delay={0}>
            <div className="pricing-card pricing-featured">
              <div className="pricing-offer-badge">🎉 এপ্রিল অফার — ৫০% ছাড়</div>
              <div className="pricing-header">
                <div className="pricing-icon"><i className="ph-fill ph-calendar-check" /></div>
                <h3 className="pricing-name">বার্ষিক নিবন্ধন প্ল্যান</h3>
                <p className="pricing-tagline">এককালীন বার্ষিক সদস্যপদ</p>
              </div>
              <div className="pricing-price">
                <span className="price-original">৳১০,০০০</span>
                <span className="price-current">৳৫,০০০</span>
                <span className="price-period">/বছর</span>
              </div>
              <p className="pricing-desc">
                এপ্রিল মাস জুড়ে বর্ষ উপলক্ষে রেজিস্ট্রেশন ফি বাবদ ৫০% ছাড়। এখনই যোগ দিন এবং
                সবার বাজার প্ল্যাটফর্মের সকল সুবিধা উপভোগ করুন।
              </p>
              <ul className="pricing-features">
                {[
                  'প্ল্যাটফর্মের সকল সুবিধা অন্তর্ভুক্ত',
                  'নিজস্ব অনলাইন শপ ও ড্যাশবোর্ড',
                  'আনলিমিটেড প্রোডাক্ট লিস্টিং',
                  'মার্কেটিং ও প্রমোশন সাপোর্ট',
                  'নিরাপদ পেমেন্ট সিস্টেম',
                  'দেশব্যাপী ডেলিভারি নেটওয়ার্ক',
                ].map((f, i) => (
                  <li key={i}><i className="ph-fill ph-check-circle" />{f}</li>
                ))}
              </ul>
              <a href={SELLER_URL} className="btn btn-white btn-glow-white pricing-btn">
                <i className="ph ph-storefront" />
                এখনই শুরু করুন
              </a>
            </div>
          </Reveal>

          {/* Plan 2 — Commission */}
          <Reveal delay={120}>
            <div className="pricing-card">
              <div className="pricing-header">
                <div className="pricing-icon pricing-icon-alt"><i className="ph-fill ph-percent" /></div>
                <h3 className="pricing-name">কমিশন-ভিত্তিক প্ল্যান</h3>
                <p className="pricing-tagline">কোনো আপফ্রন্ট খরচ নেই</p>
              </div>
              <div className="pricing-price">
                <span className="price-current price-alt">10%</span>
                <span className="price-period">/বিক্রয়ের উপর</span>
              </div>
              <p className="pricing-desc">
                এককালীন রেজিস্ট্রেশন ফি না দিতে চাইলে, সর্বমোট বিক্রির উপর ৫% কমিশন + ডেলিভারি
                চার্জ প্রযোজ্য হবে।
              </p>
              <ul className="pricing-features">
                {[
                  'রেজিস্ট্রেশন ফি ছাড়াই শুরু করুন',
                  'প্রতি বিক্রয়ে মাত্র ৫% কমিশন',
                  'ডেলিভারি চার্জ প্রযোজ্য',
                  'প্রতি ৩–৭ দিনে পেমেন্ট ট্রান্সফার',
                  'বিক্রয়ের টাকা আমরা সংগ্রহ করি',
                  'নিরাপদ ও সময়মতো পেআউট',
                ].map((f, i) => (
                  <li key={i}><i className="ph-fill ph-check-circle" />{f}</li>
                ))}
              </ul>
              <a href={SELLER_URL} className="btn btn-primary btn-glow pricing-btn">
                <i className="ph ph-storefront" />
                এই প্ল্যান বেছে নিন
              </a>
            </div>
          </Reveal>

          {/* Plan 3 — Website Development */}
          <Reveal delay={240}>
            <div className="pricing-card pricing-website">
              <div className="pricing-offer-badge pricing-offer-badge-blue">🌐 নতুন সার্ভিস</div>
              <div className="pricing-header">
                <div className="pricing-icon pricing-icon-web"><i className="ph-fill ph-globe" /></div>
                <h3 className="pricing-name">ই-কমার্স ওয়েবসাইট</h3>
                <p className="pricing-tagline">আপনার নিজস্ব অনলাইন স্টোর</p>
              </div>
              <div className="pricing-price">
                <span className="price-current price-web">কাস্টম</span>
              </div>
              <p className="pricing-desc">
                আমরা আপনার জন্য একটি সম্পূর্ণ কাস্টম ই-কমার্স ওয়েবসাইট তৈরি করে দিই — প্রোডাক্ট ম্যানেজমেন্ট,
                পেমেন্ট গেটওয়ে এবং ডেলিভারি ইন্টিগ্রেশনসহ।
              </p>
              <ul className="pricing-features">
                {[
                  'সম্পূর্ণ কাস্টম ডিজাইন ও ডেভেলপমেন্ট',
                  'প্রোডাক্ট ও অর্ডার ম্যানেজমেন্ট',
                  'পেমেন্ট গেটওয়ে ইন্টিগ্রেশন',
                  'মোবাইল ফ্রেন্ডলি রেসপন্সিভ ডিজাইন',
                  'SEO অপ্টিমাইজেশন',
                  'লঞ্চ পরবর্তী সাপোর্ট ও মেইনটেন্যান্স',
                ].map((f, i) => (
                  <li key={i}><i className="ph-fill ph-check-circle pricing-check-web" />{f}</li>
                ))}
              </ul>
              <a href="#contact" className="btn pricing-btn pricing-btn-web">
                <i className="ph ph-chat-circle-dots" />
                আলোচনা করুন
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

/* ── CEO SECTION ── */
function CEOSection() {
  return (
    <section className="section bg-soft">
      <div className="container">
        <Reveal>
          <div className="ceo-card">
            <div className="ceo-quote-mark"><i className="ph-fill ph-quotes" /></div>
            <p className="ceo-quote">
              আমরা অনলাইনে আসল পণ্য সরবরাহকারীকে অগ্রাধিকার দেই কারণ আমরা আপনার প্রতি যত্নশীল।
            </p>
            <div className="ceo-info">
              <div className="ceo-avatar">
                <img src="/ceo.png" alt="Cdr Salahuddin Ahmed" className="ceo-photo" />
              </div>
              <div>
                <h4 className="ceo-name">Cdr Salahuddin Ahmed (Retd), BN</h4>
                <span className="ceo-role">CEO & Founder — SobarBazarBD</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CTASection() {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-bg">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-pattern" />
      </div>
      <div className="container cta-inner">
        <Reveal>
          <span className="badge badge-cta">আজই শুরু করুন</span>
          <h2 className="cta-title">আমাদের সাথে কাজ করতে আগ্রহী?</h2>
          <p className="cta-desc">
            আজই SobarbazarBD-এ যোগ দিন — ফ্রি রেজিস্ট্রেশন, কোনো প্রযুক্তিগত দক্ষতার প্রয়োজন নেই,
            এবং সারা বাংলাদেশে হাজার হাজার গ্রাহকের কাছে পৌছান।
          </p>
          <div className="cta-actions">
            <a href={SELLER_URL} className="btn btn-white btn-lg btn-glow-white">
              <i className="ph ph-storefront" />
              Become a Seller
            </a>
            <a href="mailto:info@sobarbazarbd.com" className="btn btn-outline-white btn-lg">
              <i className="ph ph-envelope" />
              যোগাযোগ করুন
            </a>
          </div>
          <div className="cta-contacts">
            <a href="tel:+8801540578869"><i className="ph ph-phone" /> 01540578869</a>
            <span className="cta-divider">or</span>
            <a href="tel:+8801978975584"><i className="ph ph-phone" /> 01978975584</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img src="/logo.png" alt="SobarBazarBD Logo" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">
              Bangladesh's trusted online supermarket &amp; multi-vendor marketplace.
            </p>
          </div>
          <div className="footer-col">
            <h6>যোগাযোগ</h6>
            <ul>
              <li><i className="ph ph-phone" /> <a href="tel:+8801713332003">+880 1713-332003</a></li>
              <li><i className="ph ph-envelope-simple" /> <a href="mailto:info@sobarbazarbd.com">info@sobarbazarbd.com</a></li>
              <li><i className="ph ph-map-pin" /> Muktijoddha K S Tower, Sector-12, Uttara</li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Quick Links</h6>
            <ul>
              <li><a href="https://sobarbazarbd.com">Home</a></li>
              <li><a href={LOGIN_URL}>Seller Login</a></li>
              <li><a href="https://www.sobarbazarbd.com">www.sobarbazarbd.com</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Social</h6>
            <div className="footer-socials">
              <a href="https://facebook.com/sobarbazarbd" className="social-icon" aria-label="Facebook">
                <i className="ph-fill ph-facebook-logo" />
              </a>
              <a href="https://instagram.com/sobarbazarbd" className="social-icon" aria-label="Instagram">
                <i className="ph-fill ph-instagram-logo" />
              </a>
              <a href="https://youtube.com/@sobarbazarbd" className="social-icon" aria-label="YouTube">
                <i className="ph-fill ph-youtube-logo" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SobarBazarBD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ── MOBILE APP ── */
function MobileApp() {
  return (
    <section className="section app-section">
      <div className="container">
        <Reveal>
          <div className="app-inner">
            <div className="app-left">
              <span className="badge">📱 মোবাইল অ্যাপ</span>
              <h2 className="section-title">হাতের মুঠোয় আপনার পুরো ব্যবসা</h2>
              <p className="app-desc">
                SobarBazarBD অ্যাপটি ডাউনলোড করুন এবং যেকোনো সময়, যেকোনো জায়গা থেকে আপনার শপ পরিচালনা করুন।
                অর্ডার দেখুন, বিক্রয় ট্র্যাক করুন এবং আয় মনিটর করুন — সবই এক অ্যাপের মধ্যে।
              </p>
              <div className="app-features">
                {[
                  { icon: 'ph-fill ph-bell-ringing', text: 'রিয়েল-টাইম অর্ডার নোটিফিকেশন' },
                  { icon: 'ph-fill ph-chart-line-up', text: 'সেলস অ্যানালিটিকস ড্যাশবোর্ড' },
                  { icon: 'ph-fill ph-package', text: 'সহজ প্রোডাক্ট ম্যানেজমেন্ট' },
                  { icon: 'ph-fill ph-credit-card', text: 'দ্রুত পেমেন্ট স্ট্যাটাস' },
                ].map((f, i) => (
                  <div key={i} className="app-feat-item">
                    <i className={f.icon} />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="app-store-btns">
                <a
                  href="https://play.google.com/store/apps/details?id=com.sobarbazarbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-btn store-btn-google"
                >
                  <i className="ph-fill ph-google-play-logo" />
                  <div>
                    <span className="store-btn-sub">GET IT ON</span>
                    <span className="store-btn-main">Google Play</span>
                  </div>
                </a>
                <a
                  href="https://apps.apple.com/app/sobarbazarbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-btn store-btn-apple"
                >
                  <i className="ph-fill ph-apple-logo" />
                  <div>
                    <span className="store-btn-sub">Download on the</span>
                    <span className="store-btn-main">App Store</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="app-right">
              <div className="app-mockup">
                <div className="app-mockup-phone">
                  <div className="app-mockup-screen">
                    <div className="mock-topbar">
                      <span className="mock-logo">SobarBazarBD</span>
                      <i className="ph-fill ph-bell" />
                    </div>
                    <div className="mock-stat-row">
                      <div className="mock-stat"><span className="mock-stat-n">৩৮</span><span>অর্ডার</span></div>
                      <div className="mock-stat"><span className="mock-stat-n">৳১২,৪৫০</span><span>আয়</span></div>
                    </div>
                    <div className="mock-orders">
                      {['নতুন অর্ডার #১০৩২', 'প্যাক হয়েছে #১০৩১', 'ডেলিভারড #১০৩০'].map((o, i) => (
                        <div key={i} className="mock-order-row">
                          <span className="mock-order-dot" />
                          <span>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="app-mockup-glow" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── WHATSAPP POPUP ── */
const WA_NUMBER = '8801348080750'
const WA_MESSAGE = 'হ্যালো! আমি SobarBazarBD-এ বিক্রেতা হতে আগ্রহী। আমাকে জানান'

function WhatsAppWidget() {
  const [open, setOpen] = useState(false)

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <>
      {/* Popup */}
      {open && (
        <div className="wa-popup">
          <div className="wa-popup-header">
            <div className="wa-popup-avatar">
              <i className="ph-fill ph-whatsapp-logo" />
            </div>
            <div className="wa-popup-info">
              <span className="wa-popup-name">SobarBazarBD</span>
              <span className="wa-popup-status">
                <span className="wa-status-dot" /> অনলাইন
              </span>
            </div>
            <button className="wa-popup-close" onClick={() => setOpen(false)} aria-label="Close">
              <i className="ph ph-x" />
            </button>
          </div>
          <div className="wa-popup-body">
            <div className="wa-bubble">
              <p>হ্যালো! 👋</p>
              <p>আমাদের সাথে যোগাযোগ করুন। বিক্রেতা হওয়া নিয়ে যেকোনো প্রশ্ন থাকলে আমরা সাহায্য করতে প্রস্তুত! 😊</p>
              <span className="wa-bubble-time">SobarBazarBD</span>
            </div>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-popup-btn">
            <i className="ph-fill ph-whatsapp-logo" />
            WhatsApp-এ চ্যাট করুন
          </a>
        </div>
      )}

      {/* Floating button */}
      <button
        className={`wa-fab ${open ? 'wa-fab-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="WhatsApp তে যোগাযোগ করুন"
      >
        <i className={`ph-fill ${open ? 'ph-x' : 'ph-whatsapp-logo'}`} />
        {!open && <span className="wa-fab-ping" />}
      </button>
    </>
  )
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero />
      <Marquee />
      <AboutPlatform />
      <WhoCanSell />
      <HowItWorks />
      <Benefits />
      <WhyChoose />
      <Pricing />
      <CEOSection />
      <CTASection />
      <MobileApp />
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
