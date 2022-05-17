import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, queryByTestId } from '@testing-library/react';
import mockFeaturedBanners  from "../../../utils/featured-banners.json";
import Slider from './'

describe('<Slider />', () => {
  afterEach(cleanup);
  it('Should render featured banners slider correctly', () => {
    const { container } = render(<Slider images={mockFeaturedBanners} isLoading={false} />);
    const component = queryByTestId(container, "slider-banners");
    expect(component).toBeInTheDocument()
  });
});
