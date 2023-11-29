import React from 'react';
import GGButton, { applyStylesToAnchor } from '@george-gillams/components/button';
import Link from 'next/link';

const anchorComponent = applyStylesToAnchor(Link);
const Button = props => (
  <GGButton anchorComponent={process.env.ENABLE_SOFT_LINKS ? anchorComponent : null} {...props} />
);

export default Button;
