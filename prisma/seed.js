const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing data to avoid duplicates
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // Product 1: iPhone 17 Pro
  await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      description: 'The ultimate iPhone with A18 Pro chip and aerospace-grade titanium design.',
      mrp: 134900,
      price: 127400,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
      variants: {
        create: [
          { type: 'color', name: 'Natural Titanium' },
          { type: 'color', name: 'Space Black' },
          { type: 'color', name: 'Deep Blue' },
          { type: 'storage', name: '256GB' },
          { type: 'storage', name: '512GB' },
        ],
      },
      emiPlans: {
        create: [
          { tenure: 3, monthlyAmount: 42467, interestRate: 0, cashback: 7500 },
          { tenure: 6, monthlyAmount: 21233, interestRate: 0, cashback: 7500 },
          { tenure: 12, monthlyAmount: 10617, interestRate: 0, cashback: 7500 },
          { tenure: 24, monthlyAmount: 5308, interestRate: 0, cashback: 7500 },
          { tenure: 36, monthlyAmount: 4058, interestRate: 10.5, cashback: 7500 },
          { tenure: 48, monthlyAmount: 3197, interestRate: 10.5, cashback: 7500 },
          { tenure: 60, monthlyAmount: 2684, interestRate: 10.5, cashback: 7500 },
        ],
      },
    },
  })

  // Product 2: Samsung S24 Ultra
  await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Galaxy AI is here. Welcome to the era of mobile AI.',
      mrp: 129999,
      price: 115999,
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
      variants: {
        create: [
          { type: 'color', name: 'Titanium Gray' },
          { type: 'color', name: 'Titanium Violet' },
          { type: 'storage', name: '256GB' },
          { type: 'storage', name: '512GB' },
        ],
      },
      emiPlans: {
        create: [
          { tenure: 3, monthlyAmount: 38666, interestRate: 0, cashback: 5000 },
          { tenure: 6, monthlyAmount: 19333, interestRate: 0, cashback: 5000 },
          { tenure: 12, monthlyAmount: 9666, interestRate: 0, cashback: 5000 },
          { tenure: 24, monthlyAmount: 5340, interestRate: 10.5, cashback: 5000 },
        ],
      },
    },
  })

  // Product 3: MacBook Pro M3
  await prisma.product.create({
    data: {
      slug: 'macbook-pro-m3',
      name: 'MacBook Pro 14" M3',
      description: 'Mind-blowing speed and head-turning display. The ultimate pro laptop.',
      mrp: 169900,
      price: 159900,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
      variants: {
        create: [
          { type: 'color', name: 'Space Gray' },
          { type: 'color', name: 'Silver' },
          { type: 'storage', name: '512GB' },
          { type: 'storage', name: '1TB' },
        ],
      },
      emiPlans: {
        create: [
          { tenure: 6, monthlyAmount: 26650, interestRate: 0, cashback: 10000 },
          { tenure: 12, monthlyAmount: 13325, interestRate: 0, cashback: 10000 },
          { tenure: 18, monthlyAmount: 8883, interestRate: 0, cashback: 10000 },
          { tenure: 24, monthlyAmount: 7365, interestRate: 10.5, cashback: 10000 },
        ],
      },
    },
  })

  // Product 4: Sony PS5
  await prisma.product.create({
    data: {
      slug: 'sony-playstation-5',
      name: 'Sony PlayStation 5 Console',
      description: 'Experience lightning-fast loading with an ultra-high speed SSD and deeper immersion.',
      mrp: 54990,
      price: 49990,
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop',
      variants: {
        create: [
          { type: 'edition', name: 'Disc Edition' },
          { type: 'edition', name: 'Digital Edition' },
        ],
      },
      emiPlans: {
        create: [
          { tenure: 3, monthlyAmount: 16663, interestRate: 0, cashback: 2000 },
          { tenure: 6, monthlyAmount: 8331, interestRate: 0, cashback: 2000 },
          { tenure: 9, monthlyAmount: 5885, interestRate: 11.5, cashback: 2000 },
        ],
      },
    },
  })

  // Product 5: iPad Pro M4
  await prisma.product.create({
    data: {
      slug: 'ipad-pro-m4',
      name: 'iPad Pro 11" M4',
      description: 'The ultimate iPad experience with the most advanced display and M4 chip.',
      mrp: 99900,
      price: 97900,
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop',
      variants: {
        create: [
          { type: 'color', name: 'Space Black' },
          { type: 'color', name: 'Silver' },
          { type: 'connectivity', name: 'Wi-Fi' },
          { type: 'connectivity', name: 'Wi-Fi + Cellular' },
        ],
      },
      emiPlans: {
        create: [
          { tenure: 3, monthlyAmount: 32633, interestRate: 0, cashback: 3000 },
          { tenure: 6, monthlyAmount: 16316, interestRate: 0, cashback: 3000 },
          { tenure: 12, monthlyAmount: 8158, interestRate: 0, cashback: 3000 },
        ],
      },
    },
  })

  // Product 6: Sony WH-1000XM5
  await prisma.product.create({
    data: {
      slug: 'sony-wh-1000xm5',
      name: 'Sony WH-1000XM5 Headphones',
      description: 'Industry leading noise cancellation with two processors and 8 microphones.',
      mrp: 34990,
      price: 26990,
      imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop',
      variants: {
        create: [
          { type: 'color', name: 'Black' },
          { type: 'color', name: 'Silver' },
          { type: 'color', name: 'Midnight Blue' },
        ],
      },
      emiPlans: {
        create: [
          { tenure: 3, monthlyAmount: 8996, interestRate: 0, cashback: 1500 },
          { tenure: 6, monthlyAmount: 4498, interestRate: 0, cashback: 1500 },
        ],
      },
    },
  })

  console.log('Cleared old data and seeded 6 premium products successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
