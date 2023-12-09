import React, { useEffect } from 'react';

import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { ScrollAnimationWrapper } from '@george-gillams/components/effects';
import Paragraph from '@george-gillams/components/paragraph';
import { spacingBase } from '@george-gillams/components/constants/layout';
import Button, { BUTTON_SIZES, BUTTON_TYPES } from '@george-gillams/components/button';
import Subsection from '@george-gillams/components/subsection';
import { hyroxWhite } from 'constants/hyrox-theme';
import Steps from 'components/steps';
import { MainCtaWrapper } from './home.styles';
import Text, { SIZES } from '@george-gillams/components/text';
import { PopupButton } from '@typeform/embed-react';
import { CREATE_TEAM_FORM_ID } from 'constants/form-constants';
import { PropTypes } from 'prop-types';
import { isProduction } from 'helpers/appConfig';

const HomePage = props => {
  const { createTeam, createTeamState, ...rest } = props;

  useEffect(() => {
    if (createTeamState?.teamId) {
      document.getElementById('tf-popup-button').click();
    } else {
      console.error("Couldn't get teamId so form not opened");
    }
  }, [createTeamState?.teamId]);

  return (
    <PageContainer width={WIDTHS.fullWidth} {...rest}>
      <PageContainer centred>
        <ScrollAnimationWrapper>
          <MainCtaWrapper>
            <Paragraph style={{ marginBottom: spacingBase }}>
              <Text size={SIZES.lg}>
                Get a free, personalised Hyrox Relay plan that plays to the strengths of your team.
              </Text>
            </Paragraph>
            <Paragraph style={{ marginBottom: spacingBase }}>
              <Button size={BUTTON_SIZES.large} onClick={createTeam}>
                Create a team
              </Button>
            </Paragraph>
            <Paragraph style={{ marginBottom: spacingBase }}>
              <Button
                buttonType={BUTTON_TYPES.bouncy}
                size={BUTTON_SIZES.regular}
                href="/team/fd7631c1-37ad-4e84-87db-a16bc74236e5">
                View example plan
              </Button>
            </Paragraph>
          </MainCtaWrapper>
        </ScrollAnimationWrapper>
      </PageContainer>
      <PageContainer>
        <ScrollAnimationWrapper>
          <Steps />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <Subsection name="About" style={{ color: hyroxWhite }}>
            <Paragraph style={{ marginBottom: spacingBase }}>
              I created the Hyrox Relay Planner to help relay teams decide which stations they should each do.
            </Paragraph>
          </Subsection>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <Subsection name="How does the planner work?" style={{ color: hyroxWhite }}>
            <Paragraph style={{ marginBottom: spacingBase }}>
              There&#39;s no AI magic here, just a server doing some calculations. This works by generating all 2520
              possible permutations for how you could divide the 8 Hyrox stations between 4 of you. It then assesses
              each one according to the athlete&#39;s individual preferences as well as rest-time between stations, and
              decides which is best.
            </Paragraph>
          </Subsection>
        </ScrollAnimationWrapper>
      </PageContainer>
      <PopupButton
        style={{ opacity: 0, width: 0, height: 0 }}
        aria-hidden
        id={CREATE_TEAM_FORM_ID}
        buttonProps={{ id: 'tf-popup-button' }}
        hidden={{
          teamid: createTeamState.teamId,
          ...(!isProduction && { redirecttolocalhost: 'TRUE' }),
        }}>
        click to open form in popup
      </PopupButton>
    </PageContainer>
  );
};

HomePage.propTypes = {
  createTeam: PropTypes.func.isRequired,
  createTeamState: PropTypes.object.isRequired,
};

export default HomePage;
