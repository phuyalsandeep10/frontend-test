import { ArrowDown, ArrowUp } from 'lucide-react';
import { RiEye2Line, RiEyeOffLine } from '@remixicon/react';

export interface IconData {
  name: string;
  component: any;
  source: 'lucide' | 'remix';
}

// Register your icons here to show in design system guide document
export const iconData: IconData[] = [
  {
    name: 'arrow_up',
    component: ArrowUp,
    source: 'lucide',
  },
  {
    name: 'arrow_down',
    component: ArrowDown,
    source: 'lucide',
  },
  {
    name: 'eye',
    component: RiEye2Line,
    source: 'remix',
  },
  {
    name: 'eye_off',
    component: RiEyeOffLine,
    source: 'remix',
  },
];
