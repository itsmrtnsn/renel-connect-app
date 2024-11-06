import { GoPackage } from 'react-icons/go';
import ProductSummaryCard from './product-summary-card';
import productSummary from './products-summary';

const ProductsSummaryCardGrid = async () => {
  const result = await productSummary();

  if (!result.success) {
    return null;
  }
  const cards = [
    {
      id: 1,
      title: `Quantité d'article`,
      description: 'Stock unique actuel',
      value: result.totalProducts,
      icon: GoPackage,
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      title: `Inventaire`,
      description: 'Stock unique actuel',
      value: result.inventoryProducts,
      icon: GoPackage,
      iconColor: 'text-blue-600',
    },
    {
      id: 3,
      title: 'Non inventaire',
      description: 'Stock unique actuel',
      value: result.nonInventoryProducts,
      icon: GoPackage,
      iconColor: 'text-blue-600',
    },
    {
      id: 4,
      title: 'Services',
      description: 'Stock unique actuel',
      value: result.servicesProducts,
      icon: GoPackage,
      iconColor: 'text-blue-600',
    },
  ];
  return (
    <div className='grid grid-cols-4 gap-4'>
      {cards.map((card) => (
        <ProductSummaryCard
          key={card.id}
          title={card.title}
          value={card.value!}
          Icon={card.icon}
          iconColor={card.iconColor}
        />
      ))}
    </div>
  );
};

export default ProductsSummaryCardGrid;
