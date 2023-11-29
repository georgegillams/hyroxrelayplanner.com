import dbLoad from './dbLoad';

import { RESOURCE_NOT_FOUND } from 'server-utils/common/errorConstants';

export default async function dbLoadSingle(settings) {
  // loads values using settings
  // returns first result
  // if no result, throws error OR returns null
  const values = await dbLoad(settings);
  if (values.length > 0) {
    return values[0];
  }
  if (settings.resolveIfNotFound) {
    return null;
  }
  throw RESOURCE_NOT_FOUND;
}
