import { basePath } from '../config';

export const stripPathnameForXPPath = (pathname: string) => {
    return pathname.replace(basePath, '');
};
