import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withScrolling from 'react-dnd-scrolling';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useTranslation } from 'react-i18next';

import { SectionFragment } from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';
import { InfoState } from '@/ui/compositions';

import { StyledLink } from '../CourseSections/CourseSections.style';
import { DraggableComponentItem, useComponentContext } from './composition';
import { ComponentFormModal } from './composition/ComponentFormModal';

type ItemType = SectionFragment['items'][0];

const ScrollingComponent = withScrolling('div');

const CourseSectionItemContent = ({
  sectionItem,
  sectionDenomination,
  courseId,
  sectionId,
}: {
  sectionItem: ItemType;
  sectionDenomination: string;
  courseId?: string;
  sectionId?: string;
}) => {
  const { t } = useTranslation();
  const {
    componentItems,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedComponentType,
    openCreateModal,
    closeCreateModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    setSelectedComponentType,
    moveComponent,
    handleDragEnd,
    openEditModal,
    deleteComponent,
    getAvailableComponents,
  } = useComponentContext();

  const availableComponents = getAvailableComponents();
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Breadcrumbs>
        <StyledLink to={`/dashboard/courses/update/${courseId}`}>
          {t('courseSection.backToCourse')}
        </StyledLink>
        <StyledLink to={`/dashboard/courses/update/${courseId}/sections`}>
          {t('courseSection.sections')}
        </StyledLink>
        <StyledLink to={`/dashboard/courses/update/${courseId}/sections/${sectionId}`}>
          {sectionDenomination}
        </StyledLink>
        <StyledLink
          to={`/dashboard/courses/update/${courseId}/sections/${sectionId}/item/${sectionItem.itemId}`}
          isCurrent
        >
          {sectionItem.denomination}
        </StyledLink>
      </Breadcrumbs>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          {t('sectionItem.componentsHeader')}
        </Typography>
        <Button onClick={openCreateModal} startIcon={<AddCircleOutlineIcon />}>
          {t('common.create')}
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        {componentItems.length > 0 ? (
          <DndProvider backend={backend}>
            <ScrollingComponent>
              <Box sx={{ mt: 2 }}>
                <List>
                  {componentItems.map((item, index) => (
                    <DraggableComponentItem
                      key={item.component_id}
                      componentItem={item}
                      index={index}
                      moveComponentItem={moveComponent}
                      handleEdit={(itemId) => openEditModal(itemId)}
                      handleDelete={(itemId, itemType) => {
                        openDeleteModal(itemId, itemType);
                      }}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </List>
              </Box>
            </ScrollingComponent>
          </DndProvider>
        ) : (
          <InfoState
            btnLabel={t('sectionItem.createComponent')}
            btnOnClick={openCreateModal}
            subtitle={t('sectionItem.createComponentSubtitle')}
            title={t('sectionItem.createComponentTitle')}
            icon={<AddCircleOutlineIcon />}
          />
        )}
      </Box>

      {/* Component Type Selection Modal */}
      <Modal
        title={t('courseSection.createItem')}
        open={isCreateModalOpen}
        onClose={closeCreateModal}
      >
        <Autocomplete
          options={availableComponents}
          value={selectedComponentType}
          onChange={(_event, newValue) => setSelectedComponentType(newValue)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label={t('sectionItem.selectComponentType')} />
          )}
        />
        {selectedComponentType && <ComponentFormModal mode="create" />}
      </Modal>

      {/* Edit Component Modal */}
      <Modal title={t('sectionItem.editItem')} open={isEditModalOpen} onClose={closeEditModal}>
        <ComponentFormModal mode="edit" />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={t('sectionItem.deleteComponentConfirmation')}
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <Button onClick={closeDeleteModal} variant="outlined" fullWidth>
              {t('common.cancel')}
            </Button>
            <Button color="error" onClick={deleteComponent} fullWidth>
              {t('common.confirm')}
            </Button>
          </DialogActions>
        }
      />
    </Container>
  );
};

const CourseSectionItem = ({
  sectionItem,
  sectionDenomination,
  courseId,
  sectionId,
}: {
  sectionItem: ItemType;
  sectionDenomination: string;
  courseId?: string;
  sectionId?: string;
}) => {
  return (
    <CourseSectionItemContent
      sectionItem={sectionItem}
      sectionDenomination={sectionDenomination}
      courseId={courseId}
      sectionId={sectionId}
    />
  );
};

export default CourseSectionItem;
