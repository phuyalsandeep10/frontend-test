export interface ColorData {
  name: string;
  value: string;
  cssVar: string;
  bgClass: string;
  category: 'brand' | 'text' | 'gray' | 'status';
  usage: string[];
}

export const colorData: ColorData[] = [
  // Brand Colors
  {
    name: 'Primary',
    value: '#9500FF',
    cssVar: '--color-brand-primary',
    bgClass: 'bg-brand-primary',
    category: 'brand',
    usage: ['bg-brand-primary', 'text-brand-primary', 'border-brand-primary'],
  },
  {
    name: 'Dark',
    value: '#2D004C',
    cssVar: '--color-brand-dark',
    bgClass: 'bg-brand-dark',
    category: 'brand',
    usage: ['bg-brand-dark', 'text-brand-dark', 'border-brand-dark'],
  },
  {
    name: 'Light',
    value: '#DFB3FF',
    cssVar: '--color-brand-light',
    bgClass: 'bg-brand-light',
    category: 'brand',
    usage: ['bg-brand-light', 'text-brand-light', 'border-brand-light'],
  },
  {
    name: 'Brand Disable',
    value: '#E8DFFF',
    cssVar: '--color-brand-disable',
    bgClass: 'bg-brand-disable',
    category: 'brand',
    usage: ['bg-brand-disable', 'text-brand-disable', 'border-brand-disable'],
  },
  // Text Colors
  {
    name: 'Primary Text',
    value: '#71717A',
    cssVar: '--color-theme-text-primary',
    bgClass: 'bg-theme-text-primary',
    category: 'text',
    usage: [
      'bg-theme-text-primary',
      'text-theme-text-primary',
      'border-theme-text-primary',
    ],
  },
  {
    name: 'Dark Text',
    value: '#18181B',
    cssVar: '--color-theme-text-dark',
    bgClass: 'bg-theme-text-dark',
    category: 'text',
    usage: [
      'bg-theme-text-dark',
      'text-theme-text-dark',
      'border-theme-text-dark',
    ],
  },
  {
    name: 'Light Text',
    value: '#D4D4D8',
    cssVar: '--color-theme-text-light',
    bgClass: 'bg-theme-text-light',
    category: 'text',
    usage: [
      'bg-theme-text-light',
      'text-theme-text-light',
      'border-theme-text-light',
    ],
  },
  // Gray Colors
  {
    name: 'Primary Gray',
    value: '#737373',
    cssVar: '--color-gray-primary',
    bgClass: 'bg-gray-primary',
    category: 'gray',
    usage: ['bg-gray-primary', 'text-gray-primary', 'border-gray-primary'],
  },
  {
    name: 'Dark Gray',
    value: '#262626',
    cssVar: '--color-gray-dark',
    bgClass: 'bg-gray-dark',
    category: 'gray',
    usage: ['bg-gray-dark', 'text-gray-dark', 'border-gray-dark'],
  },
  {
    name: 'Light Gray',
    value: '#D4D4D4',
    cssVar: '--color-gray-light',
    bgClass: 'bg-gray-light',
    category: 'gray',
    usage: ['bg-gray-light', 'text-gray-light', 'border-gray-light'],
  },
  // Status Colors
  {
    name: 'Error',
    value: '#F61819',
    cssVar: '--color-error',
    bgClass: 'bg-error',
    category: 'status',
    usage: ['bg-error', 'text-error', 'border-error'],
  },
  {
    name: 'Error Light',
    value: '#FAD6D5',
    cssVar: '--color-error-light',
    bgClass: 'bg-error-light',
    category: 'status',
    usage: ['bg-error-light', 'text-error-light', 'border-error-light'],
  },
  {
    name: 'Success',
    value: '#009959',
    cssVar: '--color-success',
    bgClass: 'bg-success',
    category: 'status',
    usage: ['bg-success', 'text-success', 'border-success'],
  },
  {
    name: 'Success Light',
    value: '#E5F9DC',
    cssVar: '--color-success-light',
    bgClass: 'bg-success-light',
    category: 'status',
    usage: ['bg-success-light', 'text-success-light', 'border-success-light'],
  },
  {
    name: 'Warning',
    value: '#F5CE32',
    cssVar: '--color-warning',
    bgClass: 'bg-warning',
    category: 'status',
    usage: ['bg-warning', 'text-warning', 'border-warning'],
  },
  {
    name: 'Warning Light',
    value: '#FEF1D2',
    cssVar: '--color-warning-light',
    bgClass: 'bg-warning-light',
    category: 'status',
    usage: ['bg-warning-light', 'text-warning-light', 'border-warning-light'],
  },
  {
    name: 'Info',
    value: '#3872B7',
    cssVar: '--color-info',
    bgClass: 'bg-info',
    category: 'status',
    usage: ['bg-info', 'text-info', 'border-info'],
  },
  {
    name: 'Info Light',
    value: '#DAE8FA',
    cssVar: '--color-info-light',
    bgClass: 'bg-info-light',
    category: 'status',
    usage: ['bg-info-light', 'text-info-light', 'border-info-light'],
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
