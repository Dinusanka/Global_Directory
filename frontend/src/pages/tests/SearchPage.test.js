import * as React from 'react';
import { render } from '@testing-library/react';
import SearchPage from '../serchPage';

test('renders SearchPage without crash', () => {
  render(<SearchPage countries={[]} />);
});