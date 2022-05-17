import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, queryByTestId } from '@testing-library/react';
import mockFeaturedProducts from "../../utils/featured-products.json";
import FeaturedProductsGrid from './'

describe('<FeaturedProductsGrid />', () => {
  afterEach(cleanup);
  it('Should render featured-products correctly', () => {
    const { container } = render(<FeaturedProductsGrid featuredProducts={mockFeaturedProducts} isLoading={false} />);
    const component = queryByTestId(container, "featured-products");
    expect(component).toBeInTheDocument()
  });
});
