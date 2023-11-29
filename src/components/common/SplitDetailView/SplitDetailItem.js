import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/common/Card';

import { Item } from './split-detail-item.styles';

const SplitDetailItem = props => {
  const { children, ...rest } = props;

  return (
    <Card padded={false} {...rest}>
      <Item>{children}</Item>
    </Card>
  );
};

SplitDetailItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SplitDetailItem;
