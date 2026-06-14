import { createClient } from 'contentful'

export interface ContentfulMeal {
  fields: {
    name: string
    price: number
    description?: string
  }
}

export interface ContentfulCategory {
  fields: {
    name: string
    listOfMeals: ContentfulMeal[]
  }
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
  host: 'cdn.contentful.com',
})

export async function getMenuCategories(): Promise<ContentfulCategory[]> {
  // Brak konfiguracji → nie wywracaj builda, zwróć pustą listę.
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_DELIVERY_TOKEN) {
    console.warn('[contentful] Brak CONTENTFUL_SPACE_ID / CONTENTFUL_DELIVERY_TOKEN — pomijam menu.')
    return []
  }

  try {
    const entries = await client.getEntries({
      content_type: 'category',
      include: 2,
    })
    return entries.items as unknown as ContentfulCategory[]
  } catch (error) {
    // Awaria Contentful nie może blokować statycznego builda/deployu.
    console.error('[contentful] Nie udało się pobrać menu:', error)
    return []
  }
}
