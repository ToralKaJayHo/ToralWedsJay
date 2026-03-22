import { CanActivateFn } from '@angular/router';
import { Constants } from './constants';

export const languageGuard: CanActivateFn = (route) => {
  const lang = route.paramMap.get('language');

  return Constants.allowedLangs.includes(lang!) ? true : false;
};