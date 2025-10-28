// Component Registry for AI Sandbox
// This registry tracks all available primitives and their APIs

export interface ComponentDefinition {
  name: string
  category: 'layout' | 'input' | 'display' | 'feedback' | 'navigation' | 'data'
  importPath: string
  description: string
  props: Record<string, {
    type: string
    required: boolean
    default?: string
    description: string
  }>
  variants?: string[]
  examples: {
    basic: string
    advanced?: string
  }
}

export const componentRegistry: ComponentDefinition[] = [
  {
    name: 'Button',
    category: 'input',
    importPath: '@/components/ui/button',
    description: 'A customizable button component with multiple variants and sizes',
    props: {
      variant: {
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        required: false,
        default: 'default',
        description: 'The visual style variant of the button'
      },
      size: {
        type: '"default" | "sm" | "lg" | "icon"',
        required: false,
        default: 'default',
        description: 'The size of the button'
      },
      disabled: {
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Whether the button is disabled'
      },
      onClick: {
        type: '() => void',
        required: false,
        description: 'Click handler function'
      }
    },
    variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    examples: {
      basic: '<Button>Click me</Button>',
      advanced: '<Button variant="outline" size="lg" onClick={() => console.log("clicked")}>Custom Button</Button>'
    }
  },
  {
    name: 'Card',
    category: 'layout',
    importPath: '@/components/ui/card',
    description: 'A flexible container component for grouping related content',
    props: {
      className: {
        type: 'string',
        required: false,
        description: 'Additional CSS classes'
      }
    },
    examples: {
      basic: '<Card><CardContent>Content goes here</CardContent></Card>',
      advanced: '<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Content</CardContent></Card>'
    }
  },
  {
    name: 'CardHeader',
    category: 'layout',
    importPath: '@/components/ui/card',
    description: 'Header section for Card component',
    props: {
      className: {
        type: 'string',
        required: false,
        description: 'Additional CSS classes'
      }
    },
    examples: {
      basic: '<CardHeader><CardTitle>Title</CardTitle></CardHeader>'
    }
  },
  {
    name: 'CardTitle',
    category: 'display',
    importPath: '@/components/ui/card',
    description: 'Title component for Card header',
    props: {
      className: {
        type: 'string',
        required: false,
        description: 'Additional CSS classes'
      }
    },
    examples: {
      basic: '<CardTitle>My Card Title</CardTitle>'
    }
  },
  {
    name: 'CardContent',
    category: 'layout',
    importPath: '@/components/ui/card',
    description: 'Content section for Card component',
    props: {
      className: {
        type: 'string',
        required: false,
        description: 'Additional CSS classes'
      }
    },
    examples: {
      basic: '<CardContent>Card content goes here</CardContent>'
    }
  },
  {
    name: 'Badge',
    category: 'display',
    importPath: '@/components/ui/badge',
    description: 'Small status or label indicator',
    props: {
      variant: {
        type: '"default" | "secondary" | "destructive" | "outline"',
        required: false,
        default: 'default',
        description: 'The visual style variant of the badge'
      }
    },
    variants: ['default', 'secondary', 'destructive', 'outline'],
    examples: {
      basic: '<Badge>New</Badge>',
      advanced: '<Badge variant="secondary">Beta</Badge>'
    }
  },
  {
    name: 'Input',
    category: 'input',
    importPath: '@/components/ui/input',
    description: 'Text input field component',
    props: {
      type: {
        type: 'string',
        required: false,
        default: 'text',
        description: 'HTML input type'
      },
      placeholder: {
        type: 'string',
        required: false,
        description: 'Placeholder text'
      },
      disabled: {
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Whether the input is disabled'
      },
      value: {
        type: 'string',
        required: false,
        description: 'Input value'
      },
      onChange: {
        type: '(e: ChangeEvent<HTMLInputElement>) => void',
        required: false,
        description: 'Change handler function'
      }
    },
    examples: {
      basic: '<Input placeholder="Enter text..." />',
      advanced: '<Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />'
    }
  },
  {
    name: 'Label',
    category: 'display',
    importPath: '@/components/ui/label',
    description: 'Form label component',
    props: {
      htmlFor: {
        type: 'string',
        required: false,
        description: 'ID of the associated form element'
      }
    },
    examples: {
      basic: '<Label>Email Address</Label>',
      advanced: '<Label htmlFor="email">Email Address</Label>'
    }
  },
  {
    name: 'Tabs',
    category: 'navigation',
    importPath: '@/components/ui/tabs',
    description: 'Tab navigation component',
    props: {
      value: {
        type: 'string',
        required: false,
        description: 'Currently active tab'
      },
      onValueChange: {
        type: '(value: string) => void',
        required: false,
        description: 'Tab change handler'
      },
      defaultValue: {
        type: 'string',
        required: false,
        description: 'Default active tab'
      }
    },
    examples: {
      basic: '<Tabs defaultValue="tab1"><TabsList><TabsTrigger value="tab1">Tab 1</TabsTrigger></TabsList><TabsContent value="tab1">Content 1</TabsContent></Tabs>'
    }
  },
  {
    name: 'TabsList',
    category: 'navigation',
    importPath: '@/components/ui/tabs',
    description: 'Container for tab triggers',
    props: {
      className: {
        type: 'string',
        required: false,
        description: 'Additional CSS classes'
      }
    },
    examples: {
      basic: '<TabsList><TabsTrigger value="tab1">Tab 1</TabsTrigger></TabsList>'
    }
  },
  {
    name: 'TabsTrigger',
    category: 'navigation',
    importPath: '@/components/ui/tabs',
    description: 'Individual tab trigger button',
    props: {
      value: {
        type: 'string',
        required: true,
        description: 'Unique identifier for the tab'
      }
    },
    examples: {
      basic: '<TabsTrigger value="tab1">Tab 1</TabsTrigger>'
    }
  },
  {
    name: 'TabsContent',
    category: 'navigation',
    importPath: '@/components/ui/tabs',
    description: 'Content panel for a tab',
    props: {
      value: {
        type: 'string',
        required: true,
        description: 'Tab identifier this content belongs to'
      }
    },
    examples: {
      basic: '<TabsContent value="tab1">Content for tab 1</TabsContent>'
    }
  }
]

// Helper functions for working with the registry
export function getComponentByName(name: string): ComponentDefinition | undefined {
  return componentRegistry.find(comp => comp.name === name)
}

export function getComponentsByCategory(category: ComponentDefinition['category']): ComponentDefinition[] {
  return componentRegistry.filter(comp => comp.category === category)
}

export function getAllImportPaths(): string[] {
  return [...new Set(componentRegistry.map(comp => comp.importPath))]
}

export function generateImportStatement(components: string[]): string {
  const imports = new Map<string, string[]>()
  
  components.forEach(compName => {
    const comp = getComponentByName(compName)
    if (comp) {
      if (!imports.has(comp.importPath)) {
        imports.set(comp.importPath, [])
      }
      imports.get(comp.importPath)!.push(comp.name)
    }
  })
  
  return Array.from(imports.entries())
    .map(([path, names]) => `import { ${names.join(', ')} } from "${path}"`)
    .join('\n')
}

export function getComponentSuggestions(partialName: string): ComponentDefinition[] {
  return componentRegistry.filter(comp => 
    comp.name.toLowerCase().includes(partialName.toLowerCase()) ||
    comp.description.toLowerCase().includes(partialName.toLowerCase())
  )
}
