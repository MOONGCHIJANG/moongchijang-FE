'use client';

import { addCollection, addIcon } from '@iconify/react';
import { icons as lucideIcons } from '@iconify-json/lucide';
import { ADMIN_ICONS } from './icon-data';

addCollection(lucideIcons);
Object.entries(ADMIN_ICONS).forEach(([name, data]) => addIcon(name, data));

export default function IconsSetup() {
  return null;
}
