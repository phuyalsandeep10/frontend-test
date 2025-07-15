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
import DesignGuideTypography from './DesignGuideTypography';
import DesignGuideComponent from './DesignGuideComponent';
import IconLibrariesInfo from './IconLibrariesInfo';
import DesignsUsageGuidelines from './DesignsUsageGuidelines';
import DesignIconsUsage from './DesignIconsUsage';

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getStatusColors().map((color) => (
                <ColorCard key={color.cssVar} {...color} />
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <DesignGuideTypography />

        {/* Icons Section */}
        <section className="mb-16">
          <h2 className="text-theme-text-dark font-outfit mb-8 text-3xl font-bold">
            Icons
          </h2>

          {/* Icon Libraries Info */}
          <IconLibrariesInfo />

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
                {Object.entries(Icons).map(([name, Component]) => (
                  <IconShowcase
                    key={name}
                    iconInfo={{
                      name,
                      component: Component,
                    }}
                  />
                ))}
              </div>

              <Separator className="my-6" />

              {/* Usage Examples */}
              <DesignIconsUsage />
            </CardContent>
          </Card>
        </section>

        {/* Components Section */}
        <DesignGuideComponent />

        {/* Usage Guidelines */}
        <DesignsUsageGuidelines />
      </div>
    </div>
  );
};

export default DesignSystemGuides;
