export interface ColorData {
  name: string;
  value: string;
  cssVar: string;
  bgClass: string;
  category: 'brand' | 'text' | 'gray' | 'status';
}

export const colorData: ColorData[] = [
  // Brand Colors
  {
    name: 'Primary',
    value: '#9500FF',
    cssVar: '--color-brand-primary',
    bgClass: 'bg-brand-primary',
    category: 'brand',
  },
  {
    name: 'Dark',
    value: '#2D004C',
    cssVar: '--color-brand-dark',
    bgClass: 'bg-brand-dark',
    category: 'brand',
  },
  {
    name: 'Light',
    value: '#DFB3FF',
    cssVar: '--color-brand-light',
    bgClass: 'bg-brand-light',
    category: 'brand',
  },
  // Text Colors
  {
    name: 'Primary Text',
    value: '#71717A',
    cssVar: '--color-theme-text-primary',
    bgClass: 'bg-theme-text-primary',
    category: 'text',
  },
  {
    name: 'Dark Text',
    value: '#18181B',
    cssVar: '--color-theme-text-dark',
    bgClass: 'bg-theme-text-dark',
    category: 'text',
  },
  {
    name: 'Light Text',
    value: '#D4D4D8',
    cssVar: '--color-theme-text-light',
    bgClass: 'bg-theme-text-light',
    category: 'text',
  },
  // Gray Colors
  {
    name: 'Primary Gray',
    value: '#737373',
    cssVar: '--color-gray-primary',
    bgClass: 'bg-gray-primary',
    category: 'gray',
  },
  {
    name: 'Dark Gray',
    value: '#262626',
    cssVar: '--color-gray-dark',
    bgClass: 'bg-gray-dark',
    category: 'gray',
  },
  {
    name: 'Light Gray',
    value: '#D4D4D4',
    cssVar: '--color-gray-light',
    bgClass: 'bg-gray-light',
    category: 'gray',
  },
  // Status Colors
  {
    name: 'Error',
    value: '#F61819',
    cssVar: '--color-error',
    bgClass: 'bg-error',
    category: 'status',
  },
  {
    name: 'Error Light',
    value: '#FAD6D5',
    cssVar: '--color-error-light',
    bgClass: 'bg-error-light',
    category: 'status',
  },
  {
    name: 'Success',
    value: '#009959',
    cssVar: '--color-success',
    bgClass: 'bg-success',
    category: 'status',
  },
  {
    name: 'Success Light',
    value: '#E5F9DC',
    cssVar: '--color-success-light',
    bgClass: 'bg-success-light',
    category: 'status',
  },
  {
    name: 'Warning',
    value: '#F5CE32',
    cssVar: '--color-warning',
    bgClass: 'bg-warning',
    category: 'status',
  },
  {
    name: 'Warning Light',
    value: '#FEF1D2',
    cssVar: '--color-warning-light',
    bgClass: 'bg-warning-light',
    category: 'status',
  },
  {
    name: 'Info',
    value: '#3872B7',
    cssVar: '--color-info',
    bgClass: 'bg-info',
    category: 'status',
  },
  {
    name: 'Info Light',
    value: '#DAE8FA',
    cssVar: '--color-info-light',
    bgClass: 'bg-info-light',
    category: 'status',
  },
];

// Helper functions to filter colors by category
export const getBrandColors = () =>
  colorData.filter((color) => color.category === 'brand');
export const getTextColors = () =>
  colorData.filter((color) => color.category === 'text');
export const getGrayColors = () =>
  colorData.filter((color) => color.category === 'gray');
export const getStatusColors = () =>
  colorData.filter((color) => color.category === 'status');
