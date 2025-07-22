import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCopyToClipboard } from '@/hooks/utils/useCopyToClipboard';
import { Check, Copy } from 'lucide-react';
import React from 'react';

const ColorCard = ({
  name,
  value,
  cssVar,
  bgClass,
  usage,
}: {
  name: string;
  value: string;
  cssVar: string;
  bgClass: string;
  usage: string[];
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
          <div>
            <h4 className="text-theme-text-dark mb-2 font-semibold">
              CSS variable
            </h4>
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
          <div>
            <h4 className="text-theme-text-dark mb-2 font-semibold">Usage</h4>
            <div className="flex flex-wrap gap-1">
              {usage.map((item) => (
                <code
                  className="rounded bg-gray-100 px-2 py-1 text-xs"
                  key={item}
                >
                  {item}
                </code>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-theme-text-dark mb-2 font-semibold">
              Examples
            </h4>
            <div className="grid grid-cols-2 gap-2 space-y-1">
              {usage.map((item, index) => {
                if (item.startsWith('bg-')) {
                  return (
                    <button
                      key={index}
                      className={`${item} rounded px-2 py-2 text-sm text-white`}
                    >
                      Background
                    </button>
                  );
                } else if (item.startsWith('text-')) {
                  return (
                    <button
                      key={index}
                      className={`rounded border px-2 py-2 text-sm ${item}`}
                    >
                      Text
                    </button>
                  );
                } else if (item.startsWith('border-')) {
                  return (
                    <button
                      key={index}
                      className={`rounded border-2 px-2 py-2 text-sm ${item}`}
                    >
                      Border
                    </button>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorCard;
