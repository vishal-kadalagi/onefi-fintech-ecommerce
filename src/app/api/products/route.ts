import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { fallbackProducts } from '@/lib/fallbackData';

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
    console.error("API Error fetching products, using fallback:", error);
    return NextResponse.json(fallbackProducts);
  }
}
