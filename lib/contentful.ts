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

export async function getMenuCategories(): Promise<ContentfulCategory[]> {
  const space = process.env.CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN

  // Brak konfiguracji → nie wywracaj builda, zwróć pustą listę.
  if (!space || !accessToken) {
    console.warn('[contentful] Brak CONTENTFUL_SPACE_ID / CONTENTFUL_DELIVERY_TOKEN — pomijam menu.')
    return []
  }

  // Klient tworzony leniwie — createClient rzuca wyjątek przy braku tokenu.
  const client = createClient({ space, accessToken, host: 'cdn.contentful.com' })

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
