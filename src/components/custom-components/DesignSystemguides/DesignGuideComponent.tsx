import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const DesignGuideComponent = () => {
  return (
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
              <Badge className="bg-warning text-theme-text-dark">Warning</Badge>
              <Badge className="bg-info text-white">Info</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DesignGuideComponent;
