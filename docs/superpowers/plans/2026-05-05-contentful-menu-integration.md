# Contentful Menu Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded menu data in the cafeteria Next.js app with categories and meals fetched statically from Contentful CMS.

**Architecture:** A new `lib/contentful.ts` exports a typed Contentful client and `getMenuCategories()`. Both Server Component pages call this function at build time and render one `<MenuSection>` per category. `MenuSection` is unchanged.

**Tech Stack:** Next.js 16 App Router, TypeScript, `contentful` SDK (delivery API), Tailwind CSS

---

### Task 1: Install `contentful` package

**Files:**
- Modify: `package.json`
- Modify: `yarn.lock`

- [ ] **Step 1: Install the package**

```bash
cd /Users/barti/workspace/cafeteria && yarn add contentful
```

Expected output: `✓ Installed contentful` (no errors)

- [ ] **Step 2: Verify the package is in dependencies**

```bash
grep '"contentful"' package.json
```

Expected: `"contentful": "^10.x.x"` (or similar)

- [ ] **Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "feat: add contentful package"
```

---

### Task 2: Create `lib/contentful.ts`

**Files:**
- Create: `lib/contentful.ts`

- [ ] **Step 1: Create the file**

```typescript
// lib/contentful.ts
import contentful from 'contentful'

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

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
  host: 'cdn.contentful.com',
})

export async function getMenuCategories(): Promise<ContentfulCategory[]> {
  const entries = await client.getEntries<any>({
    content_type: 'category',
  })
  return entries.items as unknown as ContentfulCategory[]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/barti/workspace/cafeteria && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/contentful.ts
git commit -m "feat: add contentful client and getMenuCategories"
```

---

### Task 3: Add env vars to `.env`

**Files:**
- Modify: `.env`

- [ ] **Step 1: Add placeholders to `.env`**

Append to `/Users/barti/workspace/cafeteria/.env`:

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
```

- [ ] **Step 2: Fill in real values**

Get `CONTENTFUL_SPACE_ID` and `CONTENTFUL_DELIVERY_TOKEN` (Delivery API key) from Contentful → Settings → API Keys. Paste them into `.env`.

- [ ] **Step 3: Commit (placeholders only — real values must NOT be committed)**

```bash
git add .env
git commit -m "feat: add contentful env var placeholders"
```

> Note: If `.env` is not gitignored, add only the placeholder lines and keep real values in `.env.local` (which is gitignored by Next.js).

---

### Task 4: Update `app/[locale]/menu/page.tsx`

**Files:**
- Modify: `app/[locale]/menu/page.tsx`

- [ ] **Step 1: Replace the file content**

```typescript
import { setRequestLocale } from "next-intl/server";
import { MenuSection } from "../../components/menu/MenuSection";
import { getMenuCategories } from "../../../lib/contentful";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const categories = await getMenuCategories();

  return (
    <div className="min-h-screen pt-24">
      {categories.map((category, index) => (
        <div key={index} className={index % 2 === 1 ? "bg-secondary-background" : ""}>
          <MenuSection
            title={category.fields.name.toUpperCase()}
            items={category.fields.listOfMeals.map((meal) => ({
              name: meal.fields.name,
              description: meal.fields.description ?? "",
              price: `${meal.fields.price.toFixed(2)} zł`,
            }))}
            columns={2}
          />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/barti/workspace/cafeteria && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/menu/page.tsx"
git commit -m "feat: fetch menu/page data from contentful"
```

---

### Task 5: Update `app/[locale]/page.tsx`

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Remove hardcoded menu arrays and add Contentful fetch**

Replace the section from `const mainDishes = [` through the closing `];` of `drinks` (lines 108–172) and the two `<MenuSection>` JSX calls at the bottom with the following:

At the top of the file, add import:
```typescript
import { getMenuCategories } from "../../lib/contentful";
```

Replace the `mainDishes` and `drinks` arrays (and their `<MenuSection>` calls) with:

```typescript
  const categories = await getMenuCategories();
```

And in the JSX, replace:
```tsx
      <MenuSection title={t("menu.mainDishes.title")} subtitle={t("menu.mainDishes.subtitle")} items={mainDishes} columns={2} />

      <div className="bg-secondary-background">
        <MenuSection title={t("menu.drinks.title")} subtitle={t("menu.drinks.subtitle")} items={drinks} columns={2} />
      </div>
```

With:
```tsx
      {categories.map((category, index) => (
        <div key={index} className={index % 2 === 1 ? "bg-secondary-background" : ""}>
          <MenuSection
            title={category.fields.name.toUpperCase()}
            items={category.fields.listOfMeals.map((meal) => ({
              name: meal.fields.name,
              description: meal.fields.description ?? "",
              price: `${meal.fields.price.toFixed(2)} zł`,
            }))}
            columns={2}
          />
        </div>
      ))}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/barti/workspace/cafeteria && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/page.tsx"
git commit -m "feat: fetch home page menu data from contentful"
```

---

### Task 6: Remove unused i18n keys

**Files:**
- Modify: `translations/pl.json`
- Modify: `translations/en.json`

- [ ] **Step 1: Remove `menuItems` key from `translations/pl.json`**

Delete the entire `"menuItems": { ... }` block (including all nested `dishes` and `drinks` keys). The `"menu"` key (containing `mainDishes.title` etc.) is also now unused — remove it too.

After removal, verify the JSON is still valid:
```bash
python3 -m json.tool translations/pl.json > /dev/null && echo "valid"
```

Expected: `valid`

- [ ] **Step 2: Remove `menuItems` and `menu` keys from `translations/en.json`**

Same removal as Step 1 but for `translations/en.json`.

```bash
python3 -m json.tool translations/en.json > /dev/null && echo "valid"
```

Expected: `valid`

- [ ] **Step 3: Verify no remaining references to removed keys**

```bash
grep -r "menuItems\|menu\.mainDishes\|menu\.drinks" /Users/barti/workspace/cafeteria/app --include="*.tsx" --include="*.ts"
```

Expected: no output

- [ ] **Step 4: Commit**

```bash
git add translations/pl.json translations/en.json
git commit -m "chore: remove menuItems and menu i18n keys replaced by contentful"
```

---

### Task 7: Build verification

- [ ] **Step 1: Run the production build**

```bash
cd /Users/barti/workspace/cafeteria && yarn build
```

Expected: build completes with no errors. Pages `/` and `/menu` should appear as static (`○`) in the build output.

- [ ] **Step 2: Start and smoke-test**

```bash
yarn start
```

Open `http://localhost:3000/pl` and `http://localhost:3000/pl/menu`. Verify:
- Menu categories from Contentful appear as separate sections
- Each section has a title (category name) and a grid of items with name, description, price
- Alternating sections have `bg-secondary-background`

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: post-build corrections"
```
