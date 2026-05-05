# Contentful Menu Integration

**Date:** 2026-05-05
**Status:** Approved

## Goal

Replace hardcoded menu data in the cafeteria Next.js app with content fetched from Contentful CMS at build time. The same Contentful schema already used in RestaurntAstro is reused here.

## Contentful Schema

Content type `category`:
- `name`: string — category display name (e.g. "Dania główne")
- `listOfMeals`: array of references to `meal`

Content type `meal`:
- `name`: string
- `price`: number
- `description`: string (optional)

## Architecture

### New file: `lib/contentful.ts`

- Creates a Contentful delivery client using `CONTENTFUL_SPACE_ID` and `CONTENTFUL_DELIVERY_TOKEN` env vars
- Exports TypeScript interfaces: `ContentfulMeal`, `ContentfulCategory`
- Exports async function `getMenuCategories()` — fetches `content_type: 'category'`, returns `ContentfulCategory[]`

### Modified: `app/[locale]/page.tsx` and `app/[locale]/menu/page.tsx`

- Both pages call `await getMenuCategories()` as Next.js Server Components
- Hardcoded `mainDishes` and `drinks` arrays are removed
- Each returned category renders as `<MenuSection title={category.fields.name} items={...} />`
- Meal price mapped to string format: `"X.XX zł"`

### `MenuSection` component

No changes. It continues to accept `title`, `subtitle?`, `items[]`, `columns?`.

## Rendering Strategy

Static — data is fetched at build time (Next.js App Router Server Components with no `revalidate`). A redeploy is required to pick up Contentful changes.

## Environment Variables

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
```

Added as placeholders to `.env.local`. Must be populated before running `next build`.

## Error Handling

- Missing env vars or Contentful errors cause a build failure — intentional, prevents deploying with missing data
- Empty `listOfMeals` on a category renders an empty grid — acceptable, editor's responsibility
- No silent fallbacks

## i18n Cleanup

Keys `menuItems.dishes.*` and `menuItems.drinks.*` are removed from all translation files. Menu content is now managed entirely in Contentful. Other translation keys (hero, dailySpecials, studentPromotions, menu section titles/subtitles) are unaffected.

## Files Changed

| File | Change |
|------|--------|
| `lib/contentful.ts` | New — client, types, `getMenuCategories()` |
| `app/[locale]/page.tsx` | Replace hardcoded menu arrays with Contentful fetch |
| `app/[locale]/menu/page.tsx` | Same as above |
| Translation files | Remove `menuItems.dishes.*` and `menuItems.drinks.*` keys |
| `.env.local` | Add `CONTENTFUL_SPACE_ID` and `CONTENTFUL_DELIVERY_TOKEN` placeholders |
| `package.json` / `yarn.lock` | Add `contentful` package |

## Out of Scope

- Contentful Preview API / draft content
- ISR or dynamic rendering
- i18n of menu content inside Contentful
- Changes to `MenuSection` component UI
