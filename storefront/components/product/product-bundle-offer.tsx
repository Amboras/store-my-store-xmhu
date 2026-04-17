'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Package, Zap, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils/format-price'

interface BundleOfferProps {
  /** The variant ID of the current product (single unit) */
  singleVariantId: string
  /** Price of the single unit in cents */
  singlePrice: number
  /** The variant ID of the bundle product */
  bundleVariantId: string
  /** Price of the bundle in cents */
  bundlePrice: number
  /** Original/compare price of bundle in cents */
  bundleComparePrice: number
  /** Currency code */
  currency: string
  /** Bundle product title */
  bundleTitle: string
}

export default function ProductBundleOffer({
  singleVariantId,
  singlePrice,
  bundleVariantId,
  bundlePrice,
  bundleComparePrice,
  currency,
  bundleTitle,
}: BundleOfferProps) {
  const [selected, setSelected] = useState<'single' | 'bundle'>('single')
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()

  const savings = bundleComparePrice - bundlePrice
  const savingsPct = Math.round((savings / bundleComparePrice) * 100)

  const handleAdd = () => {
    const variantId = selected === 'bundle' ? bundleVariantId : singleVariantId
    setIsAdding(true)
    addItem(
      { variantId, quantity: 1 },
      {
        onSuccess: () => {
          setIsAdding(false)
          setJustAdded(true)
          toast.success(selected === 'bundle' ? 'Bundle added to bag!' : 'Added to bag')
          setTimeout(() => setJustAdded(false), 2500)
        },
        onError: (err: Error) => {
          setIsAdding(false)
          toast.error(err.message || 'Failed to add to bag')
        },
      }
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Choose Your Option</p>

      {/* Single Unit Option */}
      <button
        type="button"
        onClick={() => setSelected('single')}
        className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
          selected === 'single'
            ? 'border-[#1a56db] bg-blue-50/60'
            : 'border-border hover:border-border/80 bg-background'
        }`}
      >
        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
          selected === 'single' ? 'border-[#1a56db]' : 'border-muted-foreground/40'
        }`}>
          {selected === 'single' && <div className="w-2.5 h-2.5 rounded-full bg-[#1a56db]" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Single Unit</p>
          <p className="text-xs text-muted-foreground mt-0.5">1 device — standard price</p>
        </div>
        <span className="text-sm font-bold text-foreground flex-shrink-0">
          {formatPrice(singlePrice, currency)}
        </span>
      </button>

      {/* Bundle Option */}
      <button
        type="button"
        onClick={() => setSelected('bundle')}
        className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left relative overflow-hidden ${
          selected === 'bundle'
            ? 'border-[#1a56db] bg-blue-50/60'
            : 'border-border hover:border-border/80 bg-background'
        }`}
      >
        {/* Best Value Badge */}
        <div className="absolute top-0 right-0 bg-[#1a56db] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-bl-lg">
          Save {savingsPct}%
        </div>

        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
          selected === 'bundle' ? 'border-[#1a56db]' : 'border-muted-foreground/40'
        }`}>
          {selected === 'bundle' && <div className="w-2.5 h-2.5 rounded-full bg-[#1a56db]" />}
        </div>
        <div className="flex-1 min-w-0 pr-16">
          <div className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5 text-[#1a56db]" />
            <p className="text-sm font-semibold text-[#1a56db]">Complete Bundle</p>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{bundleTitle}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-muted-foreground line-through">{formatPrice(bundleComparePrice, currency)}</p>
          <p className="text-sm font-bold text-red-600">{formatPrice(bundlePrice, currency)}</p>
        </div>
      </button>

      {/* Add to Bag Button */}
      <button
        onClick={handleAdd}
        disabled={isAdding}
        className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wide transition-all rounded-sm ${
          justAdded
            ? 'bg-green-600 text-white'
            : 'bg-[#1a56db] hover:bg-[#1d4ed8] text-white'
        }`}
      >
        {isAdding ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Added to Bag
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            {selected === 'bundle' ? 'Add Bundle to Bag' : 'Add to Bag'}
          </>
        )}
      </button>
    </div>
  )
}
