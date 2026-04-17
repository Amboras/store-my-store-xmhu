'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ProductAccordionProps {
  description?: string | null
  details?: Record<string, string>
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ProductAccordion({ description, details }: ProductAccordionProps) {
  return (
    <div className="border-t">
      {description && (
        <AccordionItem title="Product Details" defaultOpen>
          <div
            className="prose prose-sm max-w-none text-muted-foreground [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_strong]:text-foreground [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </AccordionItem>
      )}

      <AccordionItem title="Shipping & Delivery">
        <ul className="space-y-2">
          <li>Free standard delivery on orders above ₦50,000</li>
          <li>Express delivery available at checkout (1–2 business days)</li>
          <li>Orders dispatched within 24 hours on business days</li>
          <li>Nationwide delivery across Nigeria — 2 to 5 days</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Returns & Warranty">
        <ul className="space-y-2">
          <li>30-day returns — if you&apos;re not 100% satisfied, send it back</li>
          <li>All NexaGear products come with a 2-year manufacturer&apos;s warranty</li>
          <li>Products must be in original condition with accessories included</li>
          <li>Contact our support team to initiate a return or warranty claim</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="In the Box">
        <ul className="space-y-2">
          <li>Main device</li>
          <li>USB-C charging cable</li>
          <li>Quick-start guide</li>
          <li>Official NexaGear packaging</li>
        </ul>
      </AccordionItem>
    </div>
  )
}
