import React from 'react';

import { Step, StepsWrapper } from './steps.styles';
import Text from '@george-gillams/components/text';

const Steps = () => {
  return (
    <StepsWrapper>
      <Step>
        <Text tagName="h2">Step 1</Text>
        <Text>Choose a name for your team</Text>
      </Step>
      <Step>
        <Text tagName="h2">Step 2</Text>
        <Text>Ask each athlete to submit their station preferences</Text>
      </Step>
      <Step>
        <Text tagName="h2">Step 3</Text>
        <Text>Get your personalised relay plan that&#39;s optimised to get the best out of your team!</Text>
      </Step>
    </StepsWrapper>
  );
};

export default Steps;
