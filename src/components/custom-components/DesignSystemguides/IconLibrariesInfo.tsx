import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const IconLibrariesInfo = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Lucide React
          </CardTitle>
          <CardDescription>Beautiful & consistent icon toolkit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-theme-text-primary text-sm">
              A comprehensive icon library with over 1,000+ icons designed for
              modern web applications.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://lucide.dev/', '_blank')}
                className="cursor-pointer text-xs"
              >
                Browse Icons
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open('https://lucide.dev/guide/installation', '_blank')
                }
                className="cursor-pointer text-xs"
              >
                Installation Guide
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    'https://github.com/lucide-icons/lucide',
                    '_blank',
                  )
                }
                className="cursor-pointer text-xs"
              >
                GitHub
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <code className="text-theme-text-dark text-xs">
              npm install lucide-react
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Remix Icon</CardTitle>
          <CardDescription>
            Open-source neutral-style icon system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-theme-text-primary text-sm">
              A set of open-source neutral-style system symbols for designers
              and developers.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://remixicon.com/', '_blank')}
                className="cursor-pointer text-xs"
              >
                Browse Icons
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    'https://github.com/Remix-Design/RemixIcon',
                    '_blank',
                  )
                }
                className="cursor-pointer text-xs"
              >
                GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    'https://www.npmjs.com/package/@remixicon/react',
                    '_blank',
                  )
                }
                className="cursor-pointer text-xs"
              >
                NPM Package
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <code className="text-theme-text-dark text-xs">
              npm install @remixicon/react
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconLibrariesInfo;
