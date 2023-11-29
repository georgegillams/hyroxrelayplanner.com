import React from 'react';

import CommonLayout from 'components/common/CommonLayout';
import NotFoundHRP from 'containers/NotFoundHRP';

const Page = props => {
  return (
    <CommonLayout>
      <NotFoundHRP {...props}></NotFoundHRP>
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
