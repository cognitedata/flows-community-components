import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/aura/table';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">£250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">£150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">£350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">£450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">£550.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function WithFooterDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>John Smith</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">£250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Sarah Jones</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">£150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Mike Wilson</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell className="text-right">£350.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">£750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function WithCaptionDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">£250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">£150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell className="text-right">£350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function ComplexDemo() {
  return (
    <Table>
      <TableCaption>Product inventory overview for Q4 2024.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">PROD001</TableCell>
          <TableCell>Wireless Mouse</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">145</TableCell>
          <TableCell className="text-right">£24.99</TableCell>
          <TableCell className="text-right">£3,623.55</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PROD002</TableCell>
          <TableCell>Mechanical Keyboard</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">89</TableCell>
          <TableCell className="text-right">£79.99</TableCell>
          <TableCell className="text-right">£7,119.11</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PROD003</TableCell>
          <TableCell>USB-C Cable</TableCell>
          <TableCell>Accessories</TableCell>
          <TableCell className="text-right">523</TableCell>
          <TableCell className="text-right">£9.99</TableCell>
          <TableCell className="text-right">£5,224.77</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PROD004</TableCell>
          <TableCell>Laptop Stand</TableCell>
          <TableCell>Accessories</TableCell>
          <TableCell className="text-right">67</TableCell>
          <TableCell className="text-right">£34.99</TableCell>
          <TableCell className="text-right">£2,344.33</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PROD005</TableCell>
          <TableCell>Webcam HD</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">42</TableCell>
          <TableCell className="text-right">£59.99</TableCell>
          <TableCell className="text-right">£2,519.58</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Inventory Value</TableCell>
          <TableCell className="text-right font-bold">£20,831.34</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export const tableExamples: ComponentExamples = {
  basic: {
    title: 'Basic Table',
    description: 'A simple table displaying tabular data',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/aura/table"

export function BasicDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">£250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">£150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">£350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
  },

  withFooter: {
    title: 'Table with Footer',
    description: 'Table with a footer row for totals or summary information',
    component: WithFooterDemo,
    difficulty: 'beginner',
    code: `import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/aura/table"

export function WithFooterDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>John Smith</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">£250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Sarah Jones</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">£150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Mike Wilson</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell className="text-right">£350.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">£750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}`,
  },

  withCaption: {
    title: 'Table with Caption',
    description: 'Table with a caption describing the table contents',
    component: WithCaptionDemo,
    difficulty: 'beginner',
    code: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/aura/table"

export function WithCaptionDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">£250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">£150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell className="text-right">£350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
  },

  complex: {
    title: 'Complete Table',
    description:
      'A comprehensive example with all table components: caption, header, body, and footer',
    component: ComplexDemo,
    difficulty: 'intermediate',
    code: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/aura/table"

export function ComplexDemo() {
  return (
    <Table>
      <TableCaption>Product inventory overview for Q4 2024.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">PROD001</TableCell>
          <TableCell>Wireless Mouse</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">145</TableCell>
          <TableCell className="text-right">£24.99</TableCell>
          <TableCell className="text-right">£3,623.55</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PROD002</TableCell>
          <TableCell>Mechanical Keyboard</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">89</TableCell>
          <TableCell className="text-right">£79.99</TableCell>
          <TableCell className="text-right">£7,119.11</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PROD003</TableCell>
          <TableCell>USB-C Cable</TableCell>
          <TableCell>Accessories</TableCell>
          <TableCell className="text-right">523</TableCell>
          <TableCell className="text-right">£9.99</TableCell>
          <TableCell className="text-right">£5,224.77</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Inventory Value</TableCell>
          <TableCell className="text-right font-bold">£20,831.34</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const tableMeta = {
  name: 'Table',
  description:
    'A responsive table component for displaying tabular data with support for headers, bodies, footers, and captions.',
  llmUsage:
    'When displaying tabular data, use `<Table>` with `<TableHeader>`, `<TableBody>`, and `<TableRow>` components. Add `<TableFooter>` for summary rows and `<TableCaption>` for accessible descriptions.',
  importPath: '@/components/ui/aura/table',
};




