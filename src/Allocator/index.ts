import allocate from './allocate';
import allocateBy from './allocateBy';

export interface AllocatorInterface {
  allocate: typeof allocate;
  allocateBy: typeof allocateBy;
}

export {
  allocate,
  allocateBy,
};
