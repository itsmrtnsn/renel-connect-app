import prisma from '@/prisma/client';

export async function getProductById(product_id: string) {
  const existProduct = await prisma.product.findUnique({
    where: { id: product_id },
  });

  if (!existProduct) {
    return {
      success: false,
      message: 'Produit non trouvé',
    };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: product_id },

      include: {
        sale_items: {
          select: { quantity: true, selling_price: true, unit_price: true },
        },
      },
    });

    // Calculate total quantity sold and total revenue
    const aggregation = await prisma.saleItem.aggregate({
      _sum: {
        quantity: true,
        selling_price: true, // Assuming `total` is the revenue per sale item
      },
      where: {
        product_id: product_id,
      },
    });

    const quantitySold = aggregation._sum.quantity || 0;
    const totalRevenue = aggregation._sum.selling_price || 0;

    return {
      success: true,
      message: 'Produit trouvé',
      product: {
        ...product,
        quantitySold,
        totalRevenue,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Erreur lors de la recherche du produit: ${String(error)}`,
    };
  }
}
