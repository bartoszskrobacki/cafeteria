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
  const entries = await client.getEntries({
    content_type: 'category',
    include: 2,
  })
  return entries.items as unknown as ContentfulCategory[]
}
