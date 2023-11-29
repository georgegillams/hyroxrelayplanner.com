import React from 'react';

import CommonLayout from 'components/common/CommonLayout';
import NotFoundHrp from 'containers/NotFoundHrp';

const Page = props => {
  return (
    <CommonLayout>
      <NotFoundHrp {...props}></NotFoundHrp>
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
