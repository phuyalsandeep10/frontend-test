import React from 'react';
import {
  getBrandColors,
  getGrayColors,
  getStatusColors,
  getTextColors,
} from './colors';
import ColorCard from './ColorCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import IconShowcase from './IconShowcase';
import { Icons } from '@/components/ui/Icons';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { iconData } from './icon-data';

const DesignSystemGuides = () => {
  return (
    <div className="bg-theme-bg font-outfit min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-theme-text-dark font-outfit mb-4 text-4xl font-bold">
            Design System Guide
          </h1>
          <p className="text-theme-text-primary mx-auto max-w-2xl text-lg">
            A comprehensive guide for developers and designers featuring our
            brand colors, typography, and icon system.
          </p>
        </div>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="text-theme-text-dark font-outfit mb-8 text-3xl font-bold">
            Colors
          </h2>

          {/* Brand Colors */}
          <div className="mb-8">
            <h3 className="text-theme-text-dark mb-4 text-xl font-semibold">
              Brand Colors
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {getBrandColors().map((color) => (
                <ColorCard key={color.cssVar} {...color} />
              ))}
            </div>
          </div>

          {/* Text Colors */}
          <div className="mb-8">
            <h3 className="text-theme-text-dark mb-4 text-xl font-semibold">
              Text Colors
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {getTextColors().map((color) => (
                <ColorCard key={color.cssVar} {...color} />
              ))}
            </div>
          </div>

          {/* Gray Colors */}
          <div className="mb-8">
            <h3 className="text-theme-text-dark mb-4 text-xl font-semibold">
              Gray Colors
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {getGrayColors().map((color) => (
                <ColorCard key={color.cssVar} {...color} />
              ))}
            </div>
          </div>

          {/* Status Colors */}
          <div className="mb-8">
            <h3 className="text-theme-text-dark mb-4 text-xl font-semibold">
              Status Colors
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {getStatusColors().map((color) => (
                <ColorCard key={color.cssVar} {...color} />
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
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
                      <p className="text-theme-text-primary text-sm">
                        Heading 1
                      </p>
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
                      <p className="text-theme-text-primary text-sm">
                        Heading 2
                      </p>
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
                      <p className="text-theme-text-primary text-sm">
                        Heading 3
                      </p>
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
                      <p className="text-theme-text-primary text-sm">
                        Heading 4
                      </p>
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
                      <p className="text-theme-text-primary text-sm">
                        Body Large
                      </p>
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
                      The quick brown fox jumps over the lazy dog. This is
                      regular body text used for paragraphs and general content
                      throughout the application.
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-theme-text-primary text-sm">
                        Body Small
                      </p>
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
                      The quick brown fox jumps over the lazy dog. This is
                      caption text used for fine print and metadata.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icons Section */}
        <section className="mb-16">
          <h2 className="text-theme-text-dark font-outfit mb-8 text-3xl font-bold">
            Icons
          </h2>

          {/* Icon Libraries Info */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Lucide React
                </CardTitle>
                <CardDescription>
                  Beautiful & consistent icon toolkit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-theme-text-primary text-sm">
                    A comprehensive icon library with over 1,000+ icons designed
                    for modern web applications.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open('https://lucide.dev/', '_blank')
                      }
                      className="cursor-pointer text-xs"
                    >
                      Browse Icons
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          'https://lucide.dev/guide/installation',
                          '_blank',
                        )
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
                <CardTitle className="flex items-center gap-2">
                  Remix Icon
                </CardTitle>
                <CardDescription>
                  Open-source neutral-style icon system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-theme-text-primary text-sm">
                    A set of open-source neutral-style system symbols for
                    designers and developers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open('https://remixicon.com/', '_blank')
                      }
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

          {/* Available Icons */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Available Icons in Our System</CardTitle>
              <CardDescription>
                Currently registered icons ready to use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {iconData.map((iconInfo) => (
                  <IconShowcase key={iconInfo.name} iconInfo={iconInfo} />
                ))}
              </div>

              <Separator className="my-6" />

              {/* Usage Examples */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-theme-text-dark mb-3 text-lg font-semibold">
                    Basic Usage
                  </h4>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <code className="text-theme-text-dark text-sm whitespace-pre-wrap">
                      {`import { Icons } from '@/components/ui/Icons';

// Basic usage
<Icons.arrow_up className="w-5 h-5" />
<Icons.eye className="w-4 h-4 text-brand-primary" />

// With styling
<Icons.arrow_down className="w-6 h-6 text-theme-text-dark hover:text-brand-primary transition-colors" />

// In buttons
<button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded">
  <Icons.eye className="w-4 h-4" />
  View Details
</button>`}
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="text-theme-text-dark mb-3 text-lg font-semibold">
                    Adding New Icons
                  </h4>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <code className="text-theme-text-dark text-sm whitespace-pre-wrap">
                      {`// Navigate Into src/components/ui/Icons.tsx
import { ArrowDown, ArrowUp, Settings, User } from 'lucide-react'
import { RiEye2Line, RiHomeLine } from "@remixicon/react"

export const Icons = {
  arrow_up: ArrowUp,
  arrow_down: ArrowDown,
  eye: RiEye2Line,
  settings: Settings,    // New Lucide icon
  user: User,           // New Lucide icon
  home: RiHomeLine,     // New Remix icon
}`}
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="text-theme-text-dark mb-3 text-lg font-semibold">
                    Icon Sizes & Best Practices
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h5 className="text-theme-text-dark font-medium">
                        Standard Sizes
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Icons.eye className="text-theme-text-primary h-4 w-4" />
                          <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                            w-4 h-4 (16px)
                          </code>
                          <span className="text-theme-text-primary text-sm">
                            Small - UI elements
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icons.eye className="text-theme-text-primary h-5 w-5" />
                          <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                            w-5 h-5 (20px)
                          </code>
                          <span className="text-theme-text-primary text-sm">
                            Medium - Buttons
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icons.eye className="text-theme-text-primary h-6 w-6" />
                          <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                            w-6 h-6 (24px)
                          </code>
                          <span className="text-theme-text-primary text-sm">
                            Large - Headers
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icons.eye className="text-theme-text-primary h-8 w-8" />
                          <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                            w-8 h-8 (32px)
                          </code>
                          <span className="text-theme-text-primary text-sm">
                            XL - Features
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Components Section */}
        <section className="mb-16">
          <h2 className="text-theme-text-dark font-outfit mb-8 text-3xl font-bold">
            Component Examples
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>
                  Button variations using brand colors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-brand-primary hover:bg-brand-dark text-white">
                    Primary Button
                  </Button>
                  <Button
                    variant="outline"
                    className="border-brand-primary text-brand-primary hover:bg-brand-light bg-transparent"
                  >
                    Outline Button
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-brand-primary hover:bg-brand-light"
                  >
                    Ghost Button
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
                <CardDescription>Badges using status colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-success text-white">Success</Badge>
                  <Badge className="bg-error text-white">Error</Badge>
                  <Badge className="bg-warning text-theme-text-dark">
                    Warning
                  </Badge>
                  <Badge className="bg-info text-white">Info</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section>
          <h2 className="text-theme-text-dark font-outfit mb-8 text-3xl font-bold">
            Usage Guidelines
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CSS Variables</CardTitle>
                <CardDescription>
                  How to use the custom CSS properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-gray-50 p-4">
                  <code className="text-theme-text-dark text-sm whitespace-pre-wrap">
                    {`/* Use in CSS */
.my-element {
  background-color: var(--color-brand-primary);
  color: var(--color-theme-text-light);
}

/* Use in Tailwind */
<div className="bg-brand-primary text-theme-text-light">
  Your Content
</div>`}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  Guidelines for consistent design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-theme-text-primary space-y-2">
                  <li>
                    • Use brand-primary for main CTAs and important actions
                  </li>
                  <li>
                    • Use status colors consistently for feedback messages
                  </li>
                  <li>• Use Outfit font for headings and body text</li>
                  <li>• Keep icon sizes consistent (16px, 20px, 24px)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystemGuides;
