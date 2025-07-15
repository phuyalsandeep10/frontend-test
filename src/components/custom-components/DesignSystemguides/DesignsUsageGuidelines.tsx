import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const DesignsUsageGuidelines = () => {
  return (
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
            <CardDescription>Guidelines for consistent design</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-theme-text-primary space-y-2">
              <li>• Use brand-primary for main CTAs and important actions</li>
              <li>• Use status colors consistently for feedback messages</li>
              <li>• Use Outfit font for headings and body text</li>
              <li>• Keep icon sizes consistent (16px, 20px, 24px)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DesignsUsageGuidelines;
