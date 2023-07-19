import { MutableRefObject } from 'react';
import { ITemplate } from './template';

export type CallbackSave = (template: MutableRefObject<ITemplate>, vars: string[]) => Promise<void>;
