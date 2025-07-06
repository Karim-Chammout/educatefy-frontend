import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';

import { CourseSectionFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { NavigationPanel } from '../Section.style';
import NavigationItem from './NavigationItem';

type SectionNavigationType = {
  section: CourseSectionFragment;
  mobileOpen: boolean;
  openItems: Record<string, boolean>;
  selectedItemId: string;
  selectedComponentId: string;
  onItemClick: (id: string) => void;
  onComponentClick: (itemId: string, componentId: string) => void;
  onBackClick: () => void;
  isComponentAccessible: (itemId: string, componentId: string) => boolean;
  isItemCompleted: (itemId: string) => boolean;
};

const SectionNavigation = ({
  section,
  mobileOpen,
  openItems,
  selectedItemId,
  selectedComponentId,
  onItemClick,
  onComponentClick,
  onBackClick,
  isComponentAccessible,
  isItemCompleted,
}: SectionNavigationType) => {
  const i18n = localStorage.getItem('i18nextLng') || 'en';

  return (
    <NavigationPanel mobileOpen={mobileOpen}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton edge="end" color="inherit" onClick={onBackClick}>
          <ArrowBackIcon sx={{ transform: i18n === 'ar' ? 'scaleX(-1)' : undefined }} />
        </IconButton>
        <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
          {section.denomination}
        </Typography>
      </div>

      <Divider />
      <List component="nav">
        {section.items.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            isActive={item.id === selectedItemId}
            isOpen={openItems[item.id]}
            isCompleted={isItemCompleted(item.id)}
            selectedComponentId={selectedComponentId}
            onItemClick={onItemClick}
            onComponentClick={onComponentClick}
            isComponentAccessible={isComponentAccessible}
          />
        ))}
      </List>
    </NavigationPanel>
  );
};

export default SectionNavigation;
