import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const DesignGuideTypography = () => {
  return (
    <section className="mb-16">
      <h2 className="text-theme-text-dark font-outfit mb-8 text-3xl font-bold">
        Typography
      </h2>

      {/* Font Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="font-outfit">Aa</span>
            Outfit Font Family
          </CardTitle>
          <CardDescription>
            Primary font used throughout the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="text-theme-text-dark mb-2 font-semibold">
                  Font Details
                </h4>
                <ul className="text-theme-text-primary space-y-1 text-sm">
                  <li>
                    <strong>Designer:</strong> Rodrigo Fuenzalida
                  </li>
                  <li>
                    <strong>Category:</strong> Sans-serif
                  </li>
                  <li>
                    <strong>Weights:</strong> 100-900 (Variable)
                  </li>
                  <li>
                    <strong>Language Support:</strong> Latin, Latin Extended
                  </li>
                  <li>
                    <strong>License:</strong> Open Font License
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-theme-text-dark font-semibold">
                  Resources
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        'https://fonts.google.com/specimen/Outfit',
                        '_blank',
                      )
                    }
                    className="text-xs"
                  >
                    Google Fonts
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        'https://github.com/Outfitio/Outfit-Fonts',
                        '_blank',
                      )
                    }
                    className="text-xs"
                  >
                    GitHub Repository
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        'https://nextjs.org/docs/app/building-your-application/optimizing/fonts',
                        '_blank',
                      )
                    }
                    className="text-xs"
                  >
                    Next.js Font Optimization
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-theme-text-dark mb-2 font-semibold">
                  Usage
                </h4>
                <div className="rounded-lg bg-gray-50 p-3">
                  <code className="text-theme-text-dark text-xs whitespace-pre-wrap">
                    {`<div className="font-outfit"> Your Content </div>`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Font Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Font Showcase</CardTitle>
          <CardDescription>
            Different weights and sizes of the Outfit font
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Weight Showcase */}
          <div>
            <h4 className="text-theme-text-dark mb-4 text-lg font-semibold">
              Font Weights
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { weight: '100', name: 'Thin' },
                { weight: '200', name: 'Extra Light' },
                { weight: '300', name: 'Light' },
                { weight: '400', name: 'Regular' },
                { weight: '500', name: 'Medium' },
                { weight: '600', name: 'Semi Bold' },
                { weight: '700', name: 'Bold' },
                { weight: '800', name: 'Extra Bold' },
                { weight: '900', name: 'Black' },
              ].map((font) => (
                <div key={font.weight} className="rounded-lg border p-3">
                  <p
                    className="font-outfit text-theme-text-dark mb-1 text-2xl"
                    style={{ fontWeight: font.weight }}
                  >
                    Outfit
                  </p>
                  <p className="text-theme-text-primary text-sm">
                    {font.name} ({font.weight})
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Typography Scale */}
          <div>
            <h4 className="text-theme-text-dark mb-4 text-lg font-semibold">
              Typography Scale
            </h4>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">Heading 1</p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-4xl font-bold
                  </code>
                </div>
                <h1 className="text-theme-text-dark font-outfit text-4xl font-bold">
                  The quick brown fox jumps over the lazy dog
                </h1>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">Heading 2</p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-3xl font-bold
                  </code>
                </div>
                <h2 className="text-theme-text-dark font-outfit text-3xl font-bold">
                  The quick brown fox jumps over the lazy dog
                </h2>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">Heading 3</p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-2xl font-semibold
                  </code>
                </div>
                <h3 className="text-theme-text-dark font-outfit text-2xl font-semibold">
                  The quick brown fox jumps over the lazy dog
                </h3>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">Heading 4</p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-xl font-semibold
                  </code>
                </div>
                <h4 className="text-theme-text-dark font-outfit text-xl font-semibold">
                  The quick brown fox jumps over the lazy dog
                </h4>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">Body Large</p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-lg font-normal
                  </code>
                </div>
                <p className="text-theme-text-primary font-outfit text-lg">
                  The quick brown fox jumps over the lazy dog. This is large
                  body text used for important paragraphs and introductory
                  content.
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">
                    Body Regular
                  </p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-base font-normal
                  </code>
                </div>
                <p className="text-theme-text-primary font-outfit text-base">
                  The quick brown fox jumps over the lazy dog. This is regular
                  body text used for paragraphs and general content throughout
                  the application.
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">Body Small</p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-sm font-normal
                  </code>
                </div>
                <p className="text-theme-text-primary font-outfit text-sm">
                  The quick brown fox jumps over the lazy dog. This is small
                  body text used for captions, labels, and secondary
                  information.
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-theme-text-primary text-sm">Caption</p>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    text-xs font-normal
                  </code>
                </div>
                <p className="text-theme-text-primary font-outfit text-xs">
                  The quick brown fox jumps over the lazy dog. This is caption
                  text used for fine print and metadata.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DesignGuideTypography;
