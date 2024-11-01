import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const ProductCardWrapper = styled(Link)`
  ${commonCardStyles}

  .product-img {
    height: 393px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }
`;

const ProductItem = ({ product }) => {
  const { name, price, brand, images } = product;
  return (
    <ProductCardWrapper to={`/product/${product._id}`}>
      <div className="product-img">
        <img
          className="object-fit-cover"
          src={images?.[0]?.url || "/path/to/default-image.jpg"}  // Fallback to default image if images[0] is undefined
          alt={name}
        />
        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <p className="font-bold">{name}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray">{product.brand?.name}</span>  {/* Display brand as string */}
          <span className="text-outerspace font-bold">${price.toFixed(2)}</span>
        </div>
      </div>
    </ProductCardWrapper>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    brand: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired, // Expect brand.name here
    }),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ProductItem;
