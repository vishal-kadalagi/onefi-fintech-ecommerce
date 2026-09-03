# 1Fi SDE1 Assignment - Full Stack E-Commerce App

A premium, full-stack Next.js web application simulating a modern FinTech e-commerce platform. It features a robust backend for serving products, variants, and dynamic EMI plans (backed by mutual funds), paired with a highly polished, interactive frontend.

## 🚀 Tech Stack & Architecture

* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Lucide React
* **Backend:** Next.js API Routes (Serverless)
* **Database:** SQLite (Used for frictionless local testing and seamless Vercel deployment)
* **ORM:** Prisma
* **State Management:** React Hooks (`useState`, `useEffect`) and `localStorage` for Cart persistence.

## ✨ Key Features & Bonus Implementations

I went beyond the core requirements to deliver a production-ready user experience:

1. **Dynamic Pricing Engine**: Selecting higher storage variants (e.g., changing iPhone from 256GB to 512GB) automatically recalculates the base price and dynamically scales the EMI monthly amounts and cashback values in real-time, maintaining mathematical accuracy for interest rates.
2. **Mixed EMI Logic**: The database successfully models complex EMI structures, properly differentiating between 0% interest short-term plans and 10.5% interest long-term plans.
3. **Dynamic Image Mapping**: Selecting different color variants dynamically crossfades the main product image to visually match the exact selected color.
4. **Functional Cart System**: Built a LocalStorage-based interactive sliding Cart Drawer. Users can add specific configurations (color, storage) and their chosen EMI plan to a persistent cart.
5. **Premium UI/UX**: Custom glassmorphism navbar, dark-mode landing hero, smooth CSS transition animations, and interactive hover states tailored for a modern Silicon Valley FinTech aesthetic. Custom SVG vector favicon included.
6. **Robust Database Seeding**: Provided a `seed.js` script that provisions the SQLite database with 6 varied premium products (Smartphones, Laptops, Consoles) and highly complex variants.

## 🛠️ Setup and Run Instructions

### Prerequisites
* Node.js (v18+)
* npm

### Installation & Local Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize the Database and Seed it:**
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Navigate to `http://localhost:3000` in your browser.

## ☁️ Deployment Notes (Vercel)
This project is fully configured for zero-config deployment on Vercel. 
*Note: Because Vercel uses ephemeral serverless functions, the local SQLite `dev.db` file is tracked in git (`.gitignore` was modified to allow this). This ensures the application can seamlessly read product and EMI data in the live production environment without requiring an external Postgres provider for this demo.*

## 🗄️ Database Schema

The database is elegantly normalized into three core models:

```prisma
model Product {
  id          Int       @id @default(autoincrement())
  slug        String    @unique
  name        String
  description String?
  mrp         Float
  price       Float
  imageUrl    String
  variants    Variant[]
  emiPlans    EmiPlan[]
}

model Variant {
  id        Int      @id @default(autoincrement())
  productId Int
  product   Product  @relation(fields: [productId], references: [id])
  type      String   // e.g., "color", "storage", "edition"
  name      String   // e.g., "Space Black", "512GB", "Disc Edition"
}

model EmiPlan {
  id            Int      @id @default(autoincrement())
  productId     Int
  product       Product  @relation(fields: [productId], references: [id])
  tenure        Int      // e.g., 3, 6, 12, 24, 36 months
  monthlyAmount Float
  interestRate  Float    // e.g., 0 for No-Cost EMI, 10.5 for standard EMI
  cashback      Float?   
}
```

## 📡 API Endpoints

### 1. Get All Products
`GET /api/products`
Fetches all products with their associated baseline data for the homepage grid.

**Example Response:**
```json
[
  {
    "id": 1,
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "description": "The latest iPhone 17 Pro with amazing features.",
    "mrp": 134900,
    "price": 127400,
    "imageUrl": "...",
    "variants": [...],
    "emiPlans": [...]
  }
]
```

### 2. Get Product by Slug
`GET /api/products/:slug`
Fetches a single product by its unique slug, including all deep relational data (Variants and EMI Plans) required for the dynamic product details page.

**Example Response:**
```json
{
  "id": 1,
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "price": 127400,
  "variants": [
    { "type": "color", "name": "Deep Blue" },
    { "type": "storage", "name": "512GB" }
  ],
  "emiPlans": [
    { "tenure": 3, "monthlyAmount": 42467, "interestRate": 0, "cashback": 7500 },
    { "tenure": 36, "monthlyAmount": 4058, "interestRate": 10.5, "cashback": 7500 }
  ]
}
```
