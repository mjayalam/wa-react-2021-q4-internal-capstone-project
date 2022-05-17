import React from "react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, screen, getByTestId, queryByTestId } from '@testing-library/react';
import mockProductCategories from "../../utils/product-categories.json";
import ProductCategoriesList from './'

describe('<ProductCategoriesList />', () => {
  afterEach(cleanup);
  it('Should render product categories grid correctly', () => {
    const { container } = render(<ProductCategoriesList productCategories={mockProductCategories} isLoading={false} />);
    const component = queryByTestId(container, "categories-list");
    expect(component).toBeInTheDocument()
  });

});
