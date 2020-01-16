import { mutate, trigger } from 'swr';
// there's gotta be a better way to do this...

export function clearAuthState() {
  mutate('/api/profile', null);
}

export function triggerAuthState() {
  trigger('/api/profile');
}
