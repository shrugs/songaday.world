import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';

export const cleanObject = (obj: Record<string, any>) => pickBy(obj, identity);
