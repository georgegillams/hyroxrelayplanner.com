import React from 'react';
import { render } from '@testing-library/react';

import Home from '../Container';

describe('<Home />', () => {
  it('should render correctly', () => {
    const { container } = render(<Home createTeamState={{ teamId: 'test-team-id' }} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with no teamId', () => {
    const { container } = render(<Home createTeamState={{}} />);

    expect(container).toMatchSnapshot();
  });
});
