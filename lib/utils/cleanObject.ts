import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export default (obj: Record<string, any>) => pickBy(obj, identity);
