import { AssetDetailsClient } from "@/components/marketplace/asset-details-client"

// Generate static params for static export
export async function generateStaticParams() {
  // In a real application, this would fetch all available asset IDs from your database/API
  // For now, we'll return a few sample IDs to demonstrate the functionality
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

export default function AssetDetailPage() {
  return <AssetDetailsClient />
}