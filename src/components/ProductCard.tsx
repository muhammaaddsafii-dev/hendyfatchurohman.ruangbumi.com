import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  pricePrefix?: string;
}

const ProductCard = ({ id, title, price, image, pricePrefix }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="product-card group block">
      <div className="product-card-image mb-4 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-green-600">
        {pricePrefix && <span>{pricePrefix} </span>}
        {price}
      </p>
    </Link>
  );
};

export default ProductCard;