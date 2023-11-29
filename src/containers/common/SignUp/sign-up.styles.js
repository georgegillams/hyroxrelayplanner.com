import styled from 'styled-components';
import { SignUpForm } from 'components/common/Forms';
import { spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import TextLink from 'components/common/TextLink';

export const StyledSignUpForm = styled(SignUpForm)`
  margin-top: ${spacingLg};
`;

export const StyledTextLink = styled(TextLink)`
  margin-top: ${spacingBase};
`;
