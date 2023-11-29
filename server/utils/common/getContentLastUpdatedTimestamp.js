import { dbLoad } from 'server-utils/common/database';

export default async function getContentLastUpdatedTimestamp() {
  const contentUpdateData = await dbLoad({ redisKey: 'contentUpdates' });
  if (contentUpdateData && contentUpdateData.length > 0) {
    // In the interest of reducing traffic, only send the raw timestamp value
    return contentUpdateData[0].lastUpdatedTimestamp;
  }
  return 1;
}
