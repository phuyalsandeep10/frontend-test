import React from 'react';
import { IconData } from './icon-data';
import { useCopyToClipboard } from '../../../../hooks/utils/useCopyToClipboard';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function IconShowcase({
  iconInfo,
  compact = false,
}: {
  iconInfo: IconData;
  compact?: boolean;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const Icon = iconInfo.component;

  if (compact) {
    return (
      <div className="group flex flex-col items-center space-y-2 rounded-lg border p-3 transition-colors hover:bg-gray-50">
        <Icon className="text-theme-text-dark h-5 w-5" />
        <span className="text-theme-text-primary font-mono text-xs">
          {iconInfo.name}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            copyToClipboard(`<Icons.${iconInfo.name} className="w-5 h-5" />`)
          }
          className="h-6 text-xs opacity-0 transition-opacity group-hover:opacity-100"
        >
          {isCopied(`<Icons.${iconInfo.name} className="w-5 h-5" />`) ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col items-center space-y-3">
        <Icon className="text-theme-text-dark h-8 w-8" />
        <div className="space-y-1 text-center">
          <h5 className="text-theme-text-dark font-mono font-medium">
            {iconInfo.name}
          </h5>
          <Badge variant="outline" className="text-xs">
            {iconInfo.source}
          </Badge>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            copyToClipboard(`<Icons.${iconInfo.name} className="w-5 h-5" />`)
          }
          className="text-xs"
        >
          {isCopied(`<Icons.${iconInfo.name} className="w-5 h-5" />`) ? (
            <>
              <Check className="mr-1 h-3 w-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3" />
              Copy Code
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
