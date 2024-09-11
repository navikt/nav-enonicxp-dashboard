import { stripPathnameForXPPath } from './url';

export const fetchXPContent = async (fullPath: string) => {
    const path = stripPathnameForXPPath(fullPath);
    console.log(path);
};
