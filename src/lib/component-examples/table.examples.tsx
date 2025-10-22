import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/cognite/table";
import { Badge } from "@/components/ui/cognite/badge";
import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="border rounded overflow-hidden max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">John Doe</TableCell>
            <TableCell>
              <Badge variant="default">Active</Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Jane Smith</TableCell>
            <TableCell>
              <Badge variant="secondary">Pending</Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Bob Johnson</TableCell>
            <TableCell>
              <Badge variant="destructive">Inactive</Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export const tableExamples: ComponentExamples = {
  basic: {
    title: "Data Table",
    description: "A table for displaying structured data",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/cognite/table"
import { Badge } from "@/components/ui/cognite/badge"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
    <div className="border rounded overflow-hidden max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">John Doe</TableCell>
            <TableCell>
              <Badge variant="default">Active</Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline">Edit</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Jane Smith</TableCell>
            <TableCell>
              <Badge variant="secondary">Pending</Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline">Edit</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Bob Johnson</TableCell>
            <TableCell>
              <Badge variant="destructive">Inactive</Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline">Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}`,
  },
};

