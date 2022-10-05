import { atom } from 'recoil';
export const modalState = atom({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });
  export const postIdlState = atom({
    key: 'postIdlState', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });
