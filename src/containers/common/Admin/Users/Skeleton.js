import React from 'react';
import PageContainer from 'components/common/PageContainer';

import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';

const PageSkeleton = props => {
  return (
    <PageContainer {...props}>
      <Skeleton skeletonStyle={SKELETON_STYLES.section} />
      <Skeleton skeletonStyle={SKELETON_STYLES.compactCard} style={{ marginTop: '1.2rem' }} />
      <Skeleton skeletonStyle={SKELETON_STYLES.compactCard} style={{ marginTop: '1.2rem' }} />
      <Skeleton skeletonStyle={SKELETON_STYLES.compactCard} style={{ marginTop: '1.2rem' }} />
      <Skeleton skeletonStyle={SKELETON_STYLES.compactCard} style={{ marginTop: '1.2rem' }} />
    </PageContainer>
  );
};

PageSkeleton.propTypes = {};

PageSkeleton.defaultProps = {};

export default PageSkeleton;
