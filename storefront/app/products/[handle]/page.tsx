import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import ProductTrustBadges from '@/components/product/product-trust-badges'
import ProductUrgency from '@/components/product/product-urgency'
import ProductBundleOffer from '@/components/product/product-bundle-offer'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'

const BUNDLE_HANDLE = 'nexagear-tech-bundle-probuds-x1-smartwatch-pro'
const BUNDLE_PRICE = 8490000
const BUNDLE_COMPARE_PRICE = 9480000

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getBundleVariantId(): Promise<string | null> {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return null
    const response = await medusaServerClient.store.product.list({
      handle: BUNDLE_HANDLE,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    const bundleProduct = response.products?.[0]
    return bundleProduct?.variants?.[0]?.id || null
  } catch {
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        allow_backorder: v.allow_backorder ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const [product, bundleVariantId] = await Promise.all([
    getProduct(handle),
    getBundleVariantId(),
  ])

  if (!product) {
    notFound()
  }

  const variantExtensions = await getVariantExtensions(product.id)

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: { url: string }) => img.url !== product.thumbnail),
  ]

  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: getProductPlaceholder(product.id) }]

  // First variant data for bundle offer
  const firstVariant = product.variants?.[0] as {
    id: string
    calculated_price?: {
      calculated_amount?: number
      currency_code?: string
    }
  } | undefined

  const singlePrice = firstVariant?.calculated_price?.calculated_amount ?? 0
  const currency = firstVariant?.calculated_price?.currency_code ?? 'ngn'

  // Get inventory info for first variant
  const firstVariantExt = firstVariant?.id ? variantExtensions[firstVariant.id] : null
  const inventoryQuantity = firstVariantExt?.inventory_quantity
  const isLowStock = inventoryQuantity != null && inventoryQuantity > 0 && inventoryQuantity < 15

  // Show bundle offer on single-item products (not on the bundle itself)
  const showBundleOffer =
    handle !== BUNDLE_HANDLE &&
    bundleVariantId != null &&
    firstVariant?.id != null &&
    singlePrice > 0

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-xl">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.slice(1, 5).map((image: { url: string }, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden bg-muted rounded-lg"
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Title */}
            <div>
              {product.subtitle && (
                <p className="text-xs font-bold uppercase tracking-widest text-[#1a56db] mb-2">
                  {product.subtitle}
                </p>
              )}
              <h1 className="text-2xl lg:text-3xl font-heading font-bold leading-tight">{product.title}</h1>
            </div>

            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={currency}
              value={singlePrice ?? null}
            />

            {/* Urgency signals */}
            <ProductUrgency
              inventoryQuantity={inventoryQuantity}
              isLowStock={isLowStock}
            />

            {/* Bundle Offer or Standard Actions */}
            {showBundleOffer ? (
              <ProductBundleOffer
                singleVariantId={firstVariant!.id}
                singlePrice={singlePrice}
                bundleVariantId={bundleVariantId!}
                bundlePrice={BUNDLE_PRICE}
                bundleComparePrice={BUNDLE_COMPARE_PRICE}
                currency={currency}
                bundleTitle="ProBuds X1 + SmartWatch Pro — Full Pack"
              />
            ) : (
              <ProductActions product={product} variantExtensions={variantExtensions} />
            )}

            {/* Trust Badges */}
            <ProductTrustBadges />

            {/* Accordion Sections */}
            <ProductAccordion
              description={product.description}
              details={product.metadata as Record<string, string> | undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}
