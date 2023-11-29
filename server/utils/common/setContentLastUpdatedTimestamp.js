import { dbLoad, dbCreate, dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';

export default function setContentLastUpdatedTimestamp() {
  let newContentUpdateData = {};
  return lockPromise('contentUpdates', async () => {
    const contentUpdateData = await dbLoad({ redisKey: 'contentUpdates' });
    if (contentUpdateData && contentUpdateData.length > 0) {
      [newContentUpdateData] = contentUpdateData;
      newContentUpdateData.lastUpdatedTimestamp = Date.now().toString();
      return await dbUpdate({ redisKey: 'contentUpdates' }, { body: newContentUpdateData });
    }
    return await dbCreate({ redisKey: 'contentUpdates' }, { body: { lastUpdatedTimestamp: Date.now() } });
  });
}
