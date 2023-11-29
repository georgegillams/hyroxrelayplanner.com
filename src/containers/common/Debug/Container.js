import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@george-gillams/components/checkbox';
import Paragraph from '@george-gillams/components/paragraph';
import PageTitle from 'components/common/PageTitle';
import {
  DEBUG_SHOW_PAGE_CONTAINER_KEY,
  DEBUG_SHOW_DEBUG_INFORMATION_KEY,
} from '@george-gillams/webapp/helpers/storageConstants';
import PageContainer from 'components/common/PageContainer';
import { VStack } from 'components/common/Stacks';
import { ANIMATIONS, withScrollAnimation } from '@george-gillams/components/effects';

const VStackWithScroll = withScrollAnimation(VStack, { animation: ANIMATIONS.fade });

const StatusControl = props => {
  const { name, storageKey, ...rest } = props;
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const debugEnabled = window.localStorage.getItem(storageKey) === 'true';
    setIsEnabled(debugEnabled);
  }, []);

  const onValueChanged = newValue => {
    setIsEnabled(newValue);
    window.localStorage.setItem(storageKey, newValue ? 'true' : 'false');
  };

  return (
    <Checkbox
      name={name}
      label={name}
      checked={isEnabled}
      onChange={event => {
        onValueChanged(event.target.checked);
      }}
      {...rest}
    />
  );
};

StatusControl.propTypes = {
  name: PropTypes.string.isRequired,
  storageKey: PropTypes.string.isRequired,
};

const Debug = props => (
  <PageContainer bottomPadding {...props}>
    <PageTitle anchor={false} name="Debug">
      <VStackWithScroll topPadding>
        <StatusControl name="Show session debug views" storageKey={DEBUG_SHOW_DEBUG_INFORMATION_KEY} />
        <StatusControl name="Show page container debug colours" storageKey={DEBUG_SHOW_PAGE_CONTAINER_KEY} />
        <Paragraph>Note that changes will not take effect until you reload the page.</Paragraph>
      </VStackWithScroll>
    </PageTitle>
  </PageContainer>
);

export default Debug;
