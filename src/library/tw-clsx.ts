import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const twClsx = (...classes: ClassValue[]): string =>
  twMerge(clsx(...classes));
