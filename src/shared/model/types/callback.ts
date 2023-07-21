import { MutableRefObject } from 'react';
import { ITemplate } from './template';

export type CallbackSave = (templateRef: MutableRefObject<ITemplate>, vars: string[]) => Promise<void>;
