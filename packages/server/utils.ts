import util from 'util';
import fs from 'fs';

export const readFile = util.promisify(fs.readFile);
