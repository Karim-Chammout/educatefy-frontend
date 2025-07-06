import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

import { CourseSectionFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { ComponentButton, ItemButton } from '../Section.style';

type NavigationItemType = {
  item: CourseSectionFragment['items'][0];
  isActive: boolean;
  isOpen: boolean;
  isCompleted: boolean;
  selectedComponentId: string;
  onItemClick: (id: string) => void;
  onComponentClick: (itemId: string, componentId: string) => void;
  isComponentAccessible: (itemId: string, componentId: string) => boolean;
};

const NavigationItem = ({
  item,
  isActive,
  isOpen,
  isCompleted,
  selectedComponentId,
  onItemClick,
  onComponentClick,
  isComponentAccessible,
}: NavigationItemType) => {
  const { t } = useTranslation();

  return (
    <Box>
      <ItemButton
        isActive={isActive}
        onClick={() => onItemClick(item.id)}
        isCompleted={isCompleted}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom>
            {item.denomination}
          </Typography>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AccessTimeIcon sx={{ fontSize: '16px' }} />
            <span>
              {item.duration} {t('common.minutes')}
            </span>
          </Typography>
        </Box>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.components.map((component) => {
            const isAccessible = isComponentAccessible(item.id, component.component_id);
            const isComponentActive = component.component_id === selectedComponentId;

            return (
              <Tooltip
                key={component.component_id}
                title={
                  !isAccessible
                    ? t('contentComponent.completeRequiredContents')
                    : component.is_required
                      ? t('contentComponent.requiredContent')
                      : ''
                }
                arrow
              >
                <span>
                  <ComponentButton
                    isActive={isComponentActive}
                    onClick={() => onComponentClick(item.id, component.component_id)}
                    isCompleted={component.progress?.is_completed ?? false}
                    isRequired={component.is_required}
                    isAccessible={isAccessible}
                    disabled={!isAccessible}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {component.denomination}
                      </Typography>
                      {component.is_required && (
                        <StarIcon sx={{ fontSize: '16px', color: '#ff9800' }} />
                      )}
                      {!isAccessible && <LockIcon sx={{ fontSize: '16px' }} />}
                    </Box>
                  </ComponentButton>
                </span>
              </Tooltip>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};

export default NavigationItem;
