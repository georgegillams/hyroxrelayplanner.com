import React from 'react';
import PageContainer from 'components/common/PageContainer';
import PageTitle from 'components/common/PageTitle';
import Paragraph from '@george-gillams/components/paragraph';

import Subsection from '@george-gillams/components/subsection';
import { VERSION } from '@george-gillams/webapp/helpers/storageConstants';
import { withScrollAnimation } from '@george-gillams/components/effects';
const SubsectionWithScroll = withScrollAnimation(Subsection);

const PrivacyPolicy = () => {
  return (
    <PageContainer bottomPadding>
      <PageTitle name="Privacy policy">
        <SubsectionWithScroll name="Accounts">
          <Paragraph>
            When you sign-up for an account we ask for a username and email. We will never share these with
            third-parties. We store these only to enable access to your account.
          </Paragraph>
        </SubsectionWithScroll>
        <SubsectionWithScroll name="Analytics">
          <Paragraph>
            This site collects basic analytics information, namely the URL paths you visit within the site, and
            information about the device you are using. This is never shared with third-parties and never used to track
            you across other services.
          </Paragraph>
          <Paragraph>
            The information collected about your device includes browser, browser version, OS, OS version, and the first
            part of your IP address which gives a very, very rough location of access.
          </Paragraph>
          <Paragraph>
            As this data contains no personally identifiable information and is not used to track you, it can be
            collected without consent.
          </Paragraph>
        </SubsectionWithScroll>
        <SubsectionWithScroll name="Cookies">
          <Paragraph>
            To keep you logged in to your user account an authentication cookie will be stored on your machine. This
            will not be used to track you, and will not be shared with any third-parties. As this is a purely functional
            cookie, it can be used without consent.
          </Paragraph>
        </SubsectionWithScroll>
        <SubsectionWithScroll name="Version">
          <Paragraph>This is version {VERSION} of the privacy policy.</Paragraph>
        </SubsectionWithScroll>
      </PageTitle>
    </PageContainer>
  );
};

export default PrivacyPolicy;
