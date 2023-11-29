import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';

import { Outer, ListView, DetailView, DetailViewContent, CloseButtonContainer } from './split-detail-view.styles';

const SplitDetailView = props => {
  const { listView, detailView, closeLink, ...rest } = props;

  return (
    <Outer {...rest}>
      <ListView>{listView}</ListView>
      {detailView && (
        <DetailView>
          <CloseButtonContainer>
            <Button href={closeLink}>Close</Button>
          </CloseButtonContainer>
          <DetailViewContent>{detailView}</DetailViewContent>
        </DetailView>
      )}
    </Outer>
  );
};

SplitDetailView.propTypes = {
  closeLink: PropTypes.string.isRequired,
  listView: PropTypes.node.isRequired,
  detailView: PropTypes.node,
};

SplitDetailView.defaultProps = {
  detailView: null,
};

export default SplitDetailView;
