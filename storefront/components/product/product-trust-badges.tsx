import { ShieldCheck, RotateCcw, Truck, Award, Lock } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    description: 'Full manufacturer guarantee',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Hassle-free, no questions',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: '2–5 days across Nigeria',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: 'SSL encrypted checkout',
  },
  {
    icon: Award,
    title: 'Genuine Products',
    description: '100% authentic, certified',
  },
]

export default function ProductTrustBadges() {
  return (
    <div className="pt-2">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg bg-muted/50"
            >
              <Icon className="h-5 w-5 text-[#1a56db]" strokeWidth={1.5} />
              <p className="text-[10px] font-bold leading-tight">{badge.title}</p>
              <p className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                {badge.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
