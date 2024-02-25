/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo } from 'react';

import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import Paragraph from '@george-gillams/components/paragraph';
import Button, { BUTTON_TYPES } from '@george-gillams/components/button';
import Subsection from '@george-gillams/components/subsection';
import { hyroxWhite } from 'constants/hyrox-theme';
import {
  MainCtaWrapper,
  NameBackground,
  PlanGrid,
  PlanItem,
  PlanItemAthlete,
  PlanItemName,
  ShareButton,
  TeamItem,
  TeamItemLinks,
  TeamWrapper,
  WarningBanner,
} from './team.styles';
import Text, { SIZES } from '@george-gillams/components/text';
import { PopupButton } from '@typeform/embed-react';
import { ATHLETE_PREFERENCE_FORM, CREATE_TEAM_FORM_ID, HYROX_EXERCISES_MAP } from 'constants/form-constants';
import { PropTypes } from 'prop-types';
import Section from '@george-gillams/components/section';
import TextLink from 'components/common/TextLink';
import { isProduction } from 'helpers/appConfig';
import Head from 'next/head';

const padStart = (char, length, text) => {
  return text.toString().padStart(length, char);
};

const getAthleteFormLink = (teamId, athleteId) => {
  let formUrl = ATHLETE_PREFERENCE_FORM.replace('TEAM_ID_PLACEHOLDER', teamId).replace(
    'ATHLETE_ID_PLACEHOLDER',
    athleteId
  );
  if (!isProduction) {
    formUrl += '&redirecttolocalhost=TRUE';
  }
  return formUrl;
};
const Plan = props => {
  const { plan, ...rest } = props;
  if (!plan?.map) {
    return null;
  }

  return (
    <div {...rest}>
      <PlanGrid>
        {plan.map((step, index) => (
          <PlanItem key={step.activity} index={index}>
            <PlanItemName>
              <Text size={SIZES.xl}>{padStart(0, 2, index + 1)}</Text>
              <Text size={SIZES.md}>{HYROX_EXERCISES_MAP[step.activity]}</Text>
            </PlanItemName>
            <PlanItemAthlete>
              <Text size={SIZES.md}>{step.athleteName}</Text>
            </PlanItemAthlete>
          </PlanItem>
        ))}
        <NameBackground />
      </PlanGrid>
    </div>
  );
};

const Athlete = props => {
  const { teamId, name, id, index, canShare, ...rest } = props;
  const disabled = !teamId || !id;

  const athleteFormUrl = getAthleteFormLink(teamId, id);

  const share = useCallback(() => {
    if (navigator?.canShare?.(athleteFormUrl)) {
      navigator.share(athleteFormUrl);
    }
  }, [athleteFormUrl]);

  return (
    <TeamItem {...rest}>
      <Text>{name || `Athlete ${index + 1}`}</Text>
      <TeamItemLinks>
        <TextLink
          disabled={disabled}
          // TODO: Shouldn't need to disable href too!
          href={!disabled && athleteFormUrl}
          hrefExternal
          aria-label={`Preference form for athlete ${name}`}>
          Preferences form
        </TextLink>
        {canShare && (
          <ShareButton buttonType={BUTTON_TYPES.bouncy} onClick={share} disabled={disabled}>
            Share
          </ShareButton>
        )}
      </TeamItemLinks>
    </TeamItem>
  );
};

const TeamPage = props => {
  const { ssrTeam, ssrPlans, loadTeam, loadPlan, teamState, ...rest } = props;

  const team = teamState?.team || ssrTeam;
  const plans = teamState?.plans || ssrPlans;
  const renderPlans = plans?.length > 0;

  const canShare = useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return !!navigator?.canShare?.(new URL('https://www.google.com/'));
  }, []);

  useEffect(() => {
    if (team?.teamId) {
      loadTeam(team.teamId);
      loadPlan(team.teamId);
    }
  }, [loadTeam, loadPlan, team?.teamId]);

  const teamName = team?.teamName || 'Your team';
  const teamId = team?.teamId || null;
  const athletes = team?.athletes || [{}, {}, {}, {}];

  const reload = useCallback(() => {
    if (team?.teamId) {
      loadTeam(team.teamId);
      loadPlan(team.teamId);
    }
  }, [loadTeam, loadPlan, team?.teamId]);

  const editTeam = useCallback(() => {
    if (teamId) {
      document.getElementById('tf-popup-button').click();
    } else {
      console.error("Couldn't get teamId so form not opened");
    }
  }, [teamId]);

  const showPlanNumberTitles = plans?.length > 1;

  return (
    <PageContainer width={WIDTHS.fullWidth} {...rest}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <PageContainer centred>
        <Section style={{ color: hyroxWhite }} name={teamName}></Section>
        <MainCtaWrapper>
          <Button buttonType="bouncy" onClick={editTeam} disabled={!teamId}>
            Edit team
          </Button>
          <Button buttonType="bouncy" onClick={reload} disabled={!teamId}>
            Reload
          </Button>
        </MainCtaWrapper>
        <TeamWrapper>
          {athletes.map((a, i) => (
            <Athlete canShare={canShare} name={a.name} key={a.id} index={i} id={a.id} teamId={teamId} />
          ))}
        </TeamWrapper>
      </PageContainer>
      <WarningBanner>
        <Paragraph padding={false}>
          <Text>
            Note: Using this website does not provide you with a Hyrox event registration. This website is a tool for
            planning your Relay, and it is not affiliated to Hyrox in any way.
          </Text>
        </Paragraph>
      </WarningBanner>
      <PageContainer centred>
        {renderPlans && (
          <Section name={`Plans`} style={{ color: hyroxWhite }}>
            <div>
              {plans.map((plan, index) => (
                <Subsection
                  name={showPlanNumberTitles ? `Plan ${index + 1}` : null}
                  key={plan.planNumber}
                  style={{ color: hyroxWhite }}>
                  <Paragraph>
                    <Plan plan={plan.plan} />
                  </Paragraph>
                  {plan.explanation?.length > 0 && (
                    <Paragraph>
                      {plan.explanation.map(line => (
                        <>
                          <span key={line}>{line}</span>
                          <br />
                        </>
                      ))}
                    </Paragraph>
                  )}
                </Subsection>
              ))}
            </div>
          </Section>
        )}
        {!renderPlans && (
          <Section name={`Your plan`} style={{ color: hyroxWhite }}>
            <Paragraph>
              <Text>
                Your personalised plans will appear here once your whole team has completed their preferences form.
              </Text>
            </Paragraph>
            <Subsection name={`How does it work?`} style={{ color: hyroxWhite }}>
              <Paragraph>
                <Text>
                  Once we have all your athletes&#39; preferences, we&#39;ll generate all 2520 possible different plans
                  for your Hyrox Relay. Each plan is then assessed according to the athletes&#39; preferences and other
                  factors such as rest time between stations. We&#39;ll then choose just the best ones to offer you.
                </Text>
              </Paragraph>
            </Subsection>
          </Section>
        )}
      </PageContainer>
      <PopupButton
        style={{ opacity: 0, width: 0, height: 0 }}
        aria-hidden
        id={CREATE_TEAM_FORM_ID}
        buttonProps={{ id: 'tf-popup-button' }}
        hidden={{
          teamid: teamId,
          ...(!isProduction && { redirecttolocalhost: 'TRUE' }),
        }}>
        click to open form in popup
      </PopupButton>
    </PageContainer>
  );
};

TeamPage.propTypes = {
  createTeam: PropTypes.func.isRequired,
  createTeamState: PropTypes.object.isRequired,
};

export default TeamPage;
