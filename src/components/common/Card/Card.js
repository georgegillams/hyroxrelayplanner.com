import React from 'react';
import GGCard, { applyStylesToAnchor } from '@george-gillams/components/card';
import Link from 'next/link';

const Card = props => <GGCard anchorComponent={applyStylesToAnchor(Link)} {...props} />;

export default Card;
