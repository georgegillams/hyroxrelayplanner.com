import React from 'react';
import PropTypes from 'prop-types';
import Paragraph from '@george-gillams/components/paragraph';
import Subsection from '@george-gillams/components/subsection';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import { EmailPreview } from './AdminEmailAPIEntity.styles';

const AdminEmailAPIEntity = props => {
  const { compact, entity, children, ...rest } = props;

  const content = (
    <Subsection anchor={false} padding={!compact} name={entity.subject || `Email ${entity.id}`}>
      <Paragraph>
        {compact && <br />}
        id: {entity.id}
        {!compact && (
          <>
            {entity.deleted && (
              <>
                <br />
                DELETED
              </>
            )}
            <br />
            to: {entity.to}
            <br />
            from: {entity.from}
            <br />
            <br />
            text: {entity.text}
          </>
        )}
      </Paragraph>
      {!compact && (
        <EmailPreview
          dangerouslySetInnerHTML={{
            __html: entity.html,
          }}
        />
      )}
      {!compact && children && children}
    </Subsection>
  );

  if (compact) {
    return (
      <SplitDetailItem id={entity.id} {...rest}>
        {content}
      </SplitDetailItem>
    );
  }
  return (
    <div id={entity.id} {...rest}>
      {content}
    </div>
  );
};

AdminEmailAPIEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
  children: PropTypes.node,
  compact: PropTypes.bool,
};

AdminEmailAPIEntity.defaultProps = {
  children: null,
  compact: false,
};

export default AdminEmailAPIEntity;
