import type { ComponentMeta } from '../../../../lib/types';

export const RecordListTemplateMetadata: ComponentMeta = {
  name: 'Record list',
  status: 'pattern',
  description:
    'List layouts that pair a page header or tabs with a full-width data grid, a side panel, or a preview.',
  llmUsage:
    'Ask the user to pick one layout, then install only that command: @aura/record-list-full-width-header (RecordListFullWidthHeader), @aura/record-list-full-width-tabs (RecordListFullWidthTabs), @aura/record-list-left-panel-header (RecordListLeftPanelHeader), @aura/record-list-left-panel-tabs (RecordListLeftPanelTabs), @aura/record-list-right-panel-header (RecordListRightPanelHeader), or @aura/record-list-right-panel-tabs (RecordListRightPanelTabs). Render the component that command installs, with no layout prop. The toolbar toggles table and card view without changing the header or side panels. A second page uses a different layout command. Keep the shared toolbar and pagination, and replace the sample rows. Read SKILL.md and record-list-template.md.',
};
