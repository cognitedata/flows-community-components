import type React from 'react';

interface ExamplePreviewProps {
  title: string;
  description?: string;
  component: React.ComponentType;
}

export function ExamplePreview({
  title,
  description,
  component: Component,
}: ExamplePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="p-6 border rounded-lg">
        <h3 className="font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        <div className="flex items-center justify-center py-4">
          <Component />
        </div>
      </div>
    </div>
  );
}
