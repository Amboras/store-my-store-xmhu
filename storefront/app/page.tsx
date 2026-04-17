'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Zap,
  Cpu,
  Wifi,
  Battery,
  Star,
  CheckCircle,
  Clock,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=85&fit=crop'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=85&fit=crop'

const features = [
  {
    icon: Cpu,
    title: 'Cutting-Edge Tech',
    description: 'Gadgets built on the latest hardware and firmware standards.',
  },
  {
    icon: Wifi,
    title: 'Seamless Connectivity',
    description: 'Bluetooth 5.3, Wi-Fi 6, and USB-C across our entire lineup.',
  },
  {
    icon: Battery,
    title: 'All-Day Power',
    description: 'Industry-leading battery life engineered for heavy use.',
  },
  {
    icon: Shield,
    title: '2-Year Warranty',
    description: 'Every product backed by our comprehensive warranty policy.',
  },
]

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.8', label: 'Average Rating' },
  { value: '120+', label: 'Products' },
  { value: '2-Year', label: 'Warranty' },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e1e40]">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, #1a56db 0%, transparent 60%), radial-gradient(circle at 75% 20%, #1a3a72 0%, transparent 50%)'
        }} />

        <div className="container-custom relative grid lg:grid-cols-2 gap-8 items-center py-20 lg:py-32">
          {/* Text Content */}
          <div className="space-y-7 animate-fade-in-up text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-[#60a5fa]" fill="currentColor" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#93c5fd]">
                New Arrivals Just Dropped
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-[1.08] text-balance text-white">
              Gear Up For The{' '}
              <span className="text-[#60a5fa]">Future</span>
            </h1>
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              Premium gadgets engineered for everyday performance. From smart home to on-the-go — we&apos;ve got your tech covered.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1d4ed8] text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/70 text-white/80 hover:text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>

            {/* Mini trust bar */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                Free shipping over ₦50,000
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                30-day returns
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-xl overflow-hidden tech-glow">
              <Image
                src={HERO_IMAGE}
                alt="Premium tech gadgets collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-900">4.8/5</span>
                  <span className="text-xs text-gray-500">from 12,400+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0e1e40] border-t border-white/10">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold font-heading text-white">{stat.value}</p>
                <p className="text-xs text-white/50 mt-0.5 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a56db] mb-3">Why NexaGear</p>
            <h2 className="text-h2 font-heading font-bold text-balance">
              Built Different. Built Better.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Every product in our lineup is tested for durability, performance, and real-world usability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div key={feat.title} className="group p-6 bg-background rounded-xl border hover:border-[#1a56db]/40 hover:shadow-md transition-all duration-300">
                  <div className="w-11 h-11 rounded-lg bg-[#1a56db]/10 flex items-center justify-center mb-4 group-hover:bg-[#1a56db]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#1a56db]" />
                  </div>
                  <h3 className="font-heading font-semibold text-base mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Collections */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* Brand Story / Lifestyle Section */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] bg-muted rounded-xl overflow-hidden">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Tech team working on next-gen gadgets"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0e1e40]/50 to-transparent" />
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">Our Philosophy</p>
              <h2 className="text-h2 font-heading font-bold text-balance">
                Technology That Works For You
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe the best tech doesn&apos;t get in the way — it quietly empowers your day. That&apos;s why every NexaGear product goes through rigorous real-world testing before it earns a spot in our store.
              </p>
              <ul className="space-y-3">
                {[
                  'Sourced from certified manufacturers',
                  'Each unit individually quality-checked',
                  'Firmware tested for 500+ hours',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#1a56db] flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#1a56db] hover:gap-3 transition-all"
                prefetch={true}
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Features Bar */}
      <section className="py-section-sm border-y bg-muted/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#1a56db]/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 text-[#1a56db]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-bold">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders above ₦50,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="w-10 h-10 rounded-full bg-[#1a56db]/10 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="h-5 w-5 text-[#1a56db]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-bold">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day hassle-free returns</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end text-center md:text-right">
              <div className="w-10 h-10 rounded-full bg-[#1a56db]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-[#1a56db]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-bold">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-6 bg-[#1a56db]">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white text-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white/80" />
              <span className="text-sm font-bold uppercase tracking-wide">Flash Sale Ends Soon</span>
            </div>
            <span className="hidden sm:block text-white/40">|</span>
            <span className="text-sm text-white/80">Up to 25% off selected gadgets — limited stock available</span>
            <Link
              href="/products"
              className="text-sm font-bold underline underline-offset-4 hover:text-white/80 transition-colors whitespace-nowrap"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-section bg-muted/30">
        <div className="container-custom max-w-xl text-center">
          <div className="w-12 h-12 rounded-xl bg-[#1a56db]/10 flex items-center justify-center mx-auto mb-5">
            <Zap className="h-6 w-6 text-[#1a56db]" />
          </div>
          <h2 className="text-h2 font-heading font-bold">Stay Ahead of the Curve</h2>
          <p className="mt-3 text-muted-foreground">
            Get exclusive early access to new drops, flash deals, and tech tips straight to your inbox.
          </p>
          {newsletterSubmitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-[#1a56db] font-semibold">
              <CheckCircle className="h-5 w-5" />
              You&apos;re on the list — watch your inbox!
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 border border-border rounded-sm bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-[#1a56db] focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-[#1a56db] hover:bg-[#1d4ed8] text-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors rounded-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
