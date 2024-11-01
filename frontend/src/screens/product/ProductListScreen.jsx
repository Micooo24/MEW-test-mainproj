import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Container, ContentStylings, Section } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Link } from "react-router-dom";
import ProductList from "../../components/product/ProductList";
import Title from "../../components/common/Title";
import ProductFilter from "../../components/product/ProductFilter";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const ProductsContent = styled.div`
  grid-template-columns: 320px auto;
  margin: 20px 0;

  @media (max-width: ${breakpoints.xl}) {
    grid-template-columns: 260px auto;
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 100%;
    row-gap: 24px;
  }
`;

const ProductsContentLeft = styled.div`
  border: 1px solid rgba(190, 188, 189, 0.4);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 50px;
  overflow: hidden;

  @media (max-width: ${breakpoints.lg}) {
    display: grid;
  }
`;

const ProductsContentRight = styled.div`
  padding: 16px 40px;

  .products-right-top {
    margin-bottom: 40px;
    @media (max-width: ${breakpoints.lg}) {
      margin-bottom: 24px;
    }
    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 16px;
      align-items: flex-start;
    }
  }

  .products-right-nav {
    column-gap: 16px;
    li {
      a.active {
        color: ${defaultTheme.color_purple};
      }
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-card-list {
    grid-template-columns: repeat(auto-fill, repeat(290px, auto));
  }

  .product-card {
    padding-left: 0;
    padding-right: 0;
  }
`;

const DescriptionContent = styled.div`
  .content-stylings {
    margin-left: 32px;
    @media (max-width: ${breakpoints.sm}) {
      margin-left: 0;
    }
  }
`;

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const breadcrumbItems = [
    { label: "Home", link: "/home" },
    { label: "Products", link: "" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRes = await axios.get("http://localhost:4000/api/products/all");
        const categoryRes = await axios.get("http://localhost:4000/api/categories/all");
        const brandRes = await axios.get("http://localhost:4000/api/brands/all");
        
        // Assuming products API returns all necessary fields directly.
        setProducts(productRes.data.products); // Adjust according to your API response format
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <ProductsContent className="grid items-start">
          <ProductsContentLeft>
            <ProductFilter />
          </ProductsContentLeft>
          <ProductsContentRight>
            <div className="products-right-top flex items-center justify-between">
              <h4 className="text-xxl">Women's Clothing</h4>
              <ul className="products-right-nav flex items-center justify-end flex-wrap">
                <li>
                  <Link to="/" className="active text-lg font-semibold">New</Link>
                </li>
                <li>
                  <Link to="/" className="text-lg font-semibold">Recommended</Link>
                </li>
              </ul>
            </div>
            <ProductList products={products} />
          </ProductsContentRight>
        </ProductsContent>
      </Container>
      <Section>
        <Container>
          <DescriptionContent>
            <Title titleText={"Clothing for Everyone Online"} />
            <ContentStylings className="text-base content-stylings">
              {/* Description content */}
              <Link to="/">See More</Link>
            </ContentStylings>
          </DescriptionContent>
        </Container>
      </Section>
    </main>
  );
};

export default ProductListScreen;