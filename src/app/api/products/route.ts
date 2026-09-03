import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
        emiPlans: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("API Error fetching products:", error);
    return NextResponse.json({ error: 'Failed to fetch products', details: String(error) }, { status: 500 });
  }
}
