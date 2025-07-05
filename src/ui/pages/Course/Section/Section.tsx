import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import {
  CourseSectionFragment,
  useUpdateContentComponentProgressMutation,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { getMediaUrl } from '@/utils/getMediaUrl';

import {
  ComponentButton,
  ContentArea,
  ItemButton,
  MobileMenuButton,
  NavigationPanel,
  SectionContainer,
  TextContent,
  VideoComponent,
} from './Section.style';

const Section = ({ section }: { section: CourseSectionFragment }) => {
  const { slug, itemId, componentId } = useParams();
  const { t } = useTranslation();
  const i18n = localStorage.getItem('i18nextLng') || 'en';
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [itemId ?? section.items[0].id]: true,
  });

  // Find the initially selected item and component from URL params
  const selectedItem = section.items.find((item) => item.id === itemId) || section.items[0];

  const selectedComponent =
    selectedItem.components.find((comp) => comp.component_id === componentId) ||
    selectedItem.components[0];

  const [updateContentComponentProgress, { loading: isUpdatingProgress }] =
    useUpdateContentComponentProgressMutation();

  const getNextComponent = () => {
    const currentItemIndex = section.items.findIndex((item) => item.id === selectedItem.id);
    const currentComponentIndex = selectedItem.components.findIndex(
      (comp) => comp.component_id === selectedComponent.component_id,
    );

    // Check if there's a next component in the current item
    if (currentComponentIndex < selectedItem.components.length - 1) {
      return {
        itemId: selectedItem.id,
        componentId: selectedItem.components[currentComponentIndex + 1].component_id,
      };
    }

    // Check if there's a next item with components
    for (let i = currentItemIndex + 1; i < section.items.length; i++) {
      if (section.items[i].components.length > 0) {
        return {
          itemId: section.items[i].id,
          componentId: section.items[i].components[0].component_id,
        };
      }
    }

    return null;
  };

  const handleItemClick = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleComponentClick = (itemID: string, componentID: string) => {
    navigate(`/course/${slug}/section/${section.id}/item/${itemID}/component/${componentID}`);
    setMobileOpen(false); // Close menu on mobile after selection
  };

  const handleCompleteAndNext = async () => {
    await updateContentComponentProgress({
      variables: {
        progressInput: {
          contentComponentId: selectedComponent.component_id,
          isCompleted: true,
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify({
            __typename: selectedComponent.__typename,
            id: selectedComponent.id,
          }),
          fields: {
            progress(existingProgress) {
              return {
                ...existingProgress,
                is_completed: true,
              };
            },
          },
        });
      },
      onCompleted: (data) => {
        if (data.updateContentComponentProgress?.success) {
          const nextComponent = getNextComponent();

          if (nextComponent) {
            navigate(
              `/course/${slug}/section/${section.id}/item/${nextComponent.itemId}/component/${nextComponent.componentId}`,
            );
          }
        }
      },
    });
  };

  const nextComponent = getNextComponent();

  const handleNavigateNext = () => {
    if (nextComponent) {
      navigate(
        `/course/${slug}/section/${section.id}/item/${nextComponent.itemId}/component/${nextComponent.componentId}`,
      );
    }
  };

  const isItemCompleted = (itemID: string) =>
    section.items
      .find((item) => item.id === itemID)
      ?.components.every((component) => component.progress?.is_completed) || false;

  const isSelectedComponentCompleted = selectedComponent.progress?.is_completed || false;

  return (
    <SectionContainer>
      <MobileMenuButton onClick={toggleMobileMenu}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          {selectedComponent.denomination}
        </Typography>
      </MobileMenuButton>

      <NavigationPanel mobileOpen={mobileOpen}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="end" color="inherit" onClick={() => navigate(`/course/${slug}`)}>
            <ArrowBackIcon sx={{ transform: i18n === 'ar' ? 'scaleX(-1)' : undefined }} />
          </IconButton>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
            {section.denomination}
          </Typography>
        </div>

        <Divider />
        <List component="nav">
          {section.items.map((item) => (
            <Box key={item.id}>
              <ItemButton
                isActive={item.id === selectedItem.id}
                onClick={() => handleItemClick(item.id)}
                isCompleted={isItemCompleted(item.id)}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 'bold' }} gutterBottom>
                    {item.denomination}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <AccessTimeIcon sx={{ fontSize: '16px' }} />
                    <span>
                      {item.duration} {t('common.minutes')}
                    </span>
                  </Typography>
                </Box>
                {openItems[item.id] ? <ExpandLess /> : <ExpandMore />}
              </ItemButton>

              <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.components.map((component) => (
                    <ComponentButton
                      key={component.component_id}
                      isActive={component.component_id === selectedComponent.component_id}
                      onClick={() => handleComponentClick(item.id, component.component_id)}
                      isCompleted={component.progress?.is_completed}
                    >
                      <Typography variant="body2">{component.denomination}</Typography>
                    </ComponentButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </NavigationPanel>

      <ContentArea fullWidth={mobileOpen}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            {selectedComponent.denomination}
          </Typography>
        </Box>

        {selectedComponent.__typename === 'TextContent' && (
          <TextContent dangerouslySetInnerHTML={{ __html: selectedComponent.content }} />
        )}

        {selectedComponent.__typename === 'VideoContent' && selectedComponent.url && (
          <VideoComponent controls>
            <source
              src={getMediaUrl(selectedComponent.url)}
              type={`video/${selectedComponent.url.split('.').pop()}`}
            />
            Your browser does not support the video tag.
          </VideoComponent>
        )}

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Stack direction={{ xxs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            {!isSelectedComponentCompleted && (
              <Button
                variant="contained"
                startIcon={<DoneIcon />}
                onClick={handleCompleteAndNext}
                disabled={isUpdatingProgress}
              >
                {nextComponent ? t('common.completeAndNext') : t('common.complete')}
              </Button>
            )}
            {isSelectedComponentCompleted && nextComponent && (
              <Button
                variant="outlined"
                startIcon={<NavigateNextIcon />}
                onClick={handleNavigateNext}
                disabled={!isSelectedComponentCompleted || isUpdatingProgress}
              >
                {t('common.next')}
              </Button>
            )}
          </Stack>
          {isSelectedComponentCompleted && !nextComponent && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Alert icon={<DoneIcon fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
                {t('courseSection.sectionCompleted')}
              </Alert>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(`/course/${slug}`)}
              >
                {t('courseSection.backToCourse')}
              </Button>
            </Box>
          )}
        </Box>
      </ContentArea>
    </SectionContainer>
  );
};

export default Section;
