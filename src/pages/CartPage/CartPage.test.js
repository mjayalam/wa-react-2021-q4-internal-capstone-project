import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, getByText } from '@testing-library/react';
import CartPage from './'
let INITIAL_STATE = {
    items: [],
    itemCount: 0,
    totalCost: 0,
  }
describe('<CartPage />', () => {
  afterEach(cleanup);
  it('Should render empty text on cart page', () => {
    const { container } = render(<CartPage state={INITIAL_STATE} dispatch={{}} />);
    const emptyText = getByText(container, "Cart is empty");
    expect(emptyText).toBeInTheDocument()
  });
});
