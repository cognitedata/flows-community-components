import type { ComponentMeta } from '../../../../lib/types';

export const RecordListTemplateMetadata: ComponentMeta = {
  name: 'Record list',
  status: 'pattern',
  description:
    'List layouts that pair a page header or tabs with a full-width data grid, a side panel, or a preview.',
  llmUsage:
    'Install @aura/record-list-template once. Before rendering, ask the user to pick one layout from full-width-header, full-width-tabs, left-panel-header, left-panel-tabs, right-panel-header, right-panel-tabs. Then render <RecordListTemplate layout="chosen-id" /> inside the app shell. The toolbar toggles table and card view without changing the header or side panels. Do not install the template again for another layout. Keep the shared toolbar and pagination, and replace the sample rows. Read SKILL.md and record-list-template.md.',
};
