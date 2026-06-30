# KESHUB

**Go For Kes** 🟢

KESHUB is a full-stack e-commerce storefront for buying secondhand and brand-new phones, laptops, headphones, and gadgets. Built for the Nigerian market, it features category-specific product grading (UK Used, Grade A/B/C, Box Ton), SIM lock status for phones, detailed specs for laptops, and a WhatsApp-first checkout flow that matches how most sales actually close in Nigeria.

The platform has two sides: a public shop where customers browse, filter, and order products, and an admin dashboard where the store owner can add, edit, and delete inventory in real time — no code required.

---

## Features

- **Full product catalog** — phones, laptops, headphones, accessories, tablets, smartwatches, and gaming gear, each with category-specific attributes
- **Condition grading system** — Brand New, Box Ton, UK Used, Grade A/B/C for secondhand items
- **Phone-specific fields** — SIM lock status, storage, RAM, color, network type, battery health
- **Laptop-specific fields** — processor, RAM, storage type (SSD/HDD), screen size, OS, graphics, battery health
- **Admin dashboard** — add, edit, and delete products with image upload, stock tracking, and featured product flags
- **Smart shop page** — category quick-links, condition/price/brand filters, all driven by live database data (no placeholder products)
- **Cart & wishlist** — session-based, no account required to shop
- **WhatsApp ordering** — one-tap checkout that opens a pre-filled WhatsApp message with product and price
- **Authentication** — secure admin login via Clerk
- **Mobile-first design** — built for customers who browse and buy primarily on their phones

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Prisma |
| Authentication | Clerk |
| Image Hosting | Cloudinary |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) account (free tier works)
- A [Cloudinary](https://cloudinary.com) account (free tier works)
- A [Clerk](https://clerk.com) account for authentication

### 1. Clone the repo

```bash
git clone https://github.com/Akpofuree/keshub.git
cd keshub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Neon PostgreSQL
DATABASE_URL="your-neon-pooled-connection-string"
DIRECT_URL="your-neon-direct-connection-string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the storefront, and `http://localhost:3000/admin` for the admin dashboard.

---

## Project Structure

```
keshub/
├── app/
│   ├── admin/          # Admin dashboard (protected by Clerk)
│   ├── api/             # API routes (products, cart, wishlist, upload)
│   ├── shop/             # Public shop and product detail pages
│   └── cart/             # Cart page
├── components/
│   ├── admin/          # Admin UI (product form, image uploader, etc.)
│   ├── shop/             # Shop UI (product cards, filters, category bar)
│   └── WhatsAppFloating.jsx
├── lib/                  # Prisma client, cart helpers
└── prisma/
    └── schema.prisma     # Database schema
```

---

## License

This project is privately owned and maintained. Not licensed for redistribution.
