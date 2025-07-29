'use client';

import React from 'react';
import { showToast } from '@/shared/toast';

const ToastUse = () => {
  return (
    <div className="space-x-2">
      <button
        onClick={() =>
          showToast({
            title: 'Success!',
            description: 'Your data has been saved.',
            variant: 'success',
          })
        }
      >
        Show Success Toast
      </button>

      <button
        onClick={() =>
          showToast({
            title: 'Oops!',
            description: 'Something went wrong.',
            variant: 'error',
            position: 'bottom-center',
          })
        }
      >
        Show Error Toast
      </button>
    </div>
  );
};

export default ToastUse;
