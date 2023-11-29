import React from 'react';
import PageContainer from 'components/common/PageContainer';
import Paragraph from '@george-gillams/components/paragraph';
import PageTitle from 'components/common/PageTitle';
import { ANIMATIONS, ScrollAnimationWrapper } from '@george-gillams/components/effects';

const Teapot = props => {
  return (
    <PageContainer bottomPadding centred {...props}>
      <PageTitle name="Error 418 - I'm a teapot." pageTitle="418">
        <ScrollAnimationWrapper animation={ANIMATIONS.fade}>
          <Paragraph>
            Coffee cannot be brewed inside a teapot context. The resulting entity body MAY be short and stout.
          </Paragraph>
        </ScrollAnimationWrapper>
      </PageTitle>
    </PageContainer>
  );
};

export default Teapot;
