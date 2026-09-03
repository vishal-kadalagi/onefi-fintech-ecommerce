const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixImage() {
  try {
    await prisma.product.update({
      where: { slug: 'samsung-s24-ultra' },
      data: { 
        // Using a highly reliable Unsplash image for a Samsung phone
        imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop' 
      }
    });
    console.log('Successfully updated the Samsung image URL!');
  } catch (error) {
    console.error('Error updating:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixImage();
