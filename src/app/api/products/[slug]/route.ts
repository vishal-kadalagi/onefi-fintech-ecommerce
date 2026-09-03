import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { fallbackProducts } from '@/lib/fallbackData';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const product = await prisma.product.findUnique({
      where: { slug: slug },
      include: {
        variants: true,
        emiPlans: { orderBy: { tenure: 'asc' } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("API Error fetching product, using fallback:", error);
    // Vercel serverless functions often lose the SQLite file. Use fallback to ensure demo works!
    const fallbackProduct = fallbackProducts.find(p => p.slug === slug);
    if (fallbackProduct) {
      return NextResponse.json(fallbackProduct);
    }
    return NextResponse.json({ error: 'Failed to fetch product', details: String(error) }, { status: 500 });
  }
}
