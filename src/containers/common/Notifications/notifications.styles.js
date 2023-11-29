import styled from 'styled-components';
import Notification from '@george-gillams/components/notification';
import { spacingBase } from '@george-gillams/components/constants/layout';

export const StyledNotification = styled(Notification)`
  &:not(:last-of-type) {
    margin-bottom: ${spacingBase};
  }
`;
