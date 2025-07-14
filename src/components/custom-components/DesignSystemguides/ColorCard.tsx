import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import React from 'react';
import { useCopyToClipboard } from '../../../../hooks/utils/useCopyToClipboard';

const ColorCard = ({
  name,
  value,
  cssVar,
  bgClass,
}: {
  name: string;
  value: string;
  cssVar: string;
  bgClass: string;
}) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  return (
    <Card className="overflow-hidden py-0">
      <div className={`h-20 ${bgClass}`} />
      <CardContent className="p-4">
        <h4 className="text-theme-text-dark mb-2 font-semibold">{name}</h4>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-theme-text-primary text-sm">{value}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(value)}
              className="h-6 w-6 p-0"
            >
              {isCopied(value) ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <code className="text-theme-text-primary rounded bg-gray-100 px-1 text-xs">
              {cssVar}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(cssVar)}
              className="h-6 w-6 p-0"
            >
              {isCopied(cssVar) ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorCard;
