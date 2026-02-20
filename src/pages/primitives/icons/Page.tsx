import {
  IconArchive as Archive,
  IconBookmark as Bookmark,
  IconCalendar as Calendar,
  IconCamera as Camera,
  IconClock as Clock,
  IconCopy as Copy,
  IconDownload as Download,
  IconEdit as Edit,
  IconFile as File,
  IconGlobe as Globe,
  IconHeart as Heart,
  IconHome as Home,
  IconLock as Lock,
  IconMail as Mail,
  IconPhone as Phone,
  IconPlus as Plus,
  IconSearch as Search,
  IconSettings as Settings,
  IconStar as Star,
  IconTrash as Trash2,
  IconUser as User,
} from '@tabler/icons-react';
import { useState } from 'react';

import { Button } from '@/components/ui/aura/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import { Input } from '@/components/ui/aura/input';

const iconSets = [
  {
    name: 'Interface',
    description: 'Essential icons for user interface elements',
    count: 240,
    icons: [Home, Settings, User, Mail, Search, Edit, Plus, Trash2],
  },
  {
    name: 'Communication',
    description: 'Icons for messaging and social features',
    count: 86,
    icons: [Mail, Phone, Heart, Star, Bookmark, Archive],
  },
  {
    name: 'Media',
    description: 'Icons for media content and files',
    count: 124,
    icons: [Camera, File, Globe, Calendar, Clock, Lock],
  },
];

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Icons</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A comprehensive icon library built on Tabler Icons React, providing consistent visual
          language across all interface elements.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Icon Sets */}
      <div className="space-y-6">
        {iconSets.map((set, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{set.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {set.description} • {set.count} icons
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy set
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-4">
                {set.icons.map((Icon, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="flex items-center justify-center p-3 rounded-lg border hover:bg-accent hover:border-accent-foreground/20 cursor-pointer transition-colors group"
                  >
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
                  </div>
                ))}
              </div>
              {set.count > 8 && (
                <div className="mt-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all {set.count} icons
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage guidelines</CardTitle>
          <CardDescription>Best practices for using icons in your interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Sizing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use 16px (h-4 w-4) for inline text</li>
                <li>• Use 20px (h-5 w-5) for buttons and controls</li>
                <li>• Use 24px (h-6 w-6) for larger interactive elements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Accessibility</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Always provide alternative text</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Don&apos;t rely on icons alone for meaning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
