import type { RadioGroupProps } from '@/components/radio/group.tsx';
import RadioGroup from '@/components/radio/group.tsx';
import type { RadioProps } from '@/components/radio/radio.tsx';
import RadioBase from '@/components/radio/radio.tsx';

type RadioType = typeof RadioBase & {
  Group: typeof RadioGroup;
};
const Radio = RadioBase as RadioType;
Radio.Group = RadioGroup;

export default Radio;
export type { RadioGroupProps, RadioProps };
