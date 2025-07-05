import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import Menu from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarIcon from '@mui/icons-material/Star';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import {
  CourseSectionFragment,
  useUpdateContentComponentProgressMutation,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { ContentComponentsType } from '@/types/types';
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

  const isComponentAccessible = (targetItemId: string, targetComponentId: string) => {
    const requiredComponents: Partial<ContentComponentsType>[] = [];
    let foundTarget = false;

    section.items.forEach((item) => {
      if (foundTarget) {
        return;
      }

      item.components.forEach((component) => {
        if (foundTarget) {
          return;
        }

        if (item.id === targetItemId && component.component_id === targetComponentId) {
          foundTarget = true;

          return;
        }

        if (component.is_required) {
          requiredComponents.push(component);
        }
      });
    });

    return requiredComponents.every((comp) => comp.progress?.is_completed);
  };

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
    if (!isComponentAccessible(itemID, componentID)) {
      return;
    }

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

  const isCurrentComponentAccessible = isComponentAccessible(
    selectedItem.id,
    selectedComponent.component_id,
  );

  // Find the first incomplete required component that blocks access
  const getBlockingComponent = (): {
    itemId: string;
    componentId: string;
    denomination: string;
  } | null => {
    let blockingComponent = null;
    let reachedTarget = false;

    section.items.some((item) => {
      return item.components.some((component) => {
        if (
          item.id === selectedItem.id &&
          component.component_id === selectedComponent.component_id
        ) {
          reachedTarget = true;

          return true;
        }

        if (!reachedTarget && component.is_required && !component.progress?.is_completed) {
          blockingComponent = {
            itemId: item.id,
            componentId: component.component_id,
            denomination: component.denomination,
          };

          return true;
        }

        return false;
      });
    });

    return blockingComponent;
  };

  const blockingComponent = getBlockingComponent();

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
                  {item.components.map((component) => {
                    const isAccessible = isComponentAccessible(item.id, component.component_id);
                    const isActive = component.component_id === selectedComponent.component_id;

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
                            isActive={isActive}
                            onClick={() => handleComponentClick(item.id, component.component_id)}
                            isCompleted={component.progress?.is_completed ?? false}
                            isRequired={component.is_required}
                            isAccessible={isAccessible}
                            disabled={!isAccessible}
                          >
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}
                            >
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
          ))}
        </List>
      </NavigationPanel>

      {isUpdatingProgress ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: { xxs: '90%', md: '60%' },
            margin: '16px auto',
          }}
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton height={120} />
        </Box>
      ) : (
        <ContentArea fullWidth={mobileOpen}>
          {!isCurrentComponentAccessible ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 4,
                textAlign: 'center',
              }}
            >
              <LockIcon sx={{ fontSize: '48px', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                {t('contentComponent.contentLocked')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, maxWidth: '400px' }}>
                {t('contentComponent.contentLockedDesc')}
              </Typography>
              {blockingComponent && (
                <Typography variant="body2" sx={{ mb: 3, maxWidth: '400px', color: '#757575' }}>
                  {t('contentComponent.nextRequired')}
                  <span style={{ fontWeight: 'bold' }}>{blockingComponent.denomination}</span>
                </Typography>
              )}
              {blockingComponent && (
                <Button
                  startIcon={<NavigateNextIcon />}
                  onClick={() =>
                    navigate(
                      `/course/${slug}/section/${section.id}/item/${blockingComponent.itemId}/component/${blockingComponent.componentId}`,
                    )
                  }
                >
                  {t('contentComponent.goToRequiredBtn')}
                </Button>
              )}
            </Box>
          ) : (
            <>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
                    {selectedComponent.denomination}
                  </Typography>
                  {selectedComponent.is_required && (
                    <Tooltip title={t('contentComponent.requiredContent')} arrow>
                      <StarIcon sx={{ fontSize: '24px', color: '#ff9800' }} />
                    </Tooltip>
                  )}
                </Box>
                {selectedComponent.is_required && !selectedComponent.progress?.is_completed && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    {t('contentComponent.requiredContentHint')}
                  </Alert>
                )}
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
            </>
          )}
        </ContentArea>
      )}
    </SectionContainer>
  );
};

export default Section;
