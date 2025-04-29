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
import { useParams } from 'react-router';

import { SectionFragment } from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';
import { InfoState } from '@/ui/compositions';

import { StyledLink } from '../CourseSections/CourseSections.style';
import {
  ComponentCreationForm,
  DraggableComponentItem,
  useComponentManagement,
} from './composition';

type ItemType = SectionFragment['items'][0];

const ScrollingComponent = withScrolling('div');

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
  const { t } = useTranslation();
  const { itemId: itemIdParam } = useParams();

  const {
    componentItems,
    handleEditComponent,
    handleDeleteComponent,
    moveComponentItem,
    handleDragEnd,
    setIsCreateItemModalOpen,
    handleEdit,
    setComponentItemToDelete,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
    isCreateItemModalOpen,
    handleCloseModal,
    componentType,
    setComponentType,
    isEditModalOpen,
    editingComponent,
    resetForm,
    handleCloseDeleteModal,
    setComponentItems,
  } = useComponentManagement(sectionItem.components, courseId, sectionId, itemIdParam);

  const componentOptions = [
    { id: 'TextContent', label: t('sectionItem.textComponentOption') },
    { id: 'VideoContent', label: t('sectionItem.videoComponentOption') },
  ];

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
        <Button onClick={() => setIsCreateItemModalOpen(true)} startIcon={<AddCircleOutlineIcon />}>
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
                      moveComponentItem={moveComponentItem}
                      handleEdit={(itemId) => handleEdit(itemId)}
                      handleDelete={(itemId, itemType) => {
                        setComponentItemToDelete({ id: itemId, type: itemType });
                        setIsDeleteModalOpen(true);
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
            btnOnClick={() => setIsCreateItemModalOpen(true)}
            subtitle={t('sectionItem.createComponentSubtitle')}
            title={t('sectionItem.createComponentTitle')}
            icon={<AddCircleOutlineIcon />}
          />
        )}
      </Box>

      <Modal
        title={t('courseSection.createItem')}
        open={isCreateItemModalOpen}
        onClose={handleCloseModal}
      >
        <Autocomplete
          options={componentOptions}
          value={componentType}
          onChange={(_event, newValue) => setComponentType(newValue)}
          renderInput={(params) => (
            <TextField {...params} label={t('sectionItem.selectComponentType')} />
          )}
        />
        {componentType && (
          <ComponentCreationForm
            componentType={componentType.id}
            parentId={sectionItem.id}
            handleCloseModalCallback={handleCloseModal}
            setComponentItems={setComponentItems}
          />
        )}
      </Modal>

      <Modal title={t('sectionItem.editItem')} open={isEditModalOpen} onClose={resetForm}>
        {editingComponent.id && (
          <ComponentCreationForm
            componentType={
              componentItems.find((item) => item.component_id === editingComponent.id)
                ?.__typename as string
            }
            parentId={sectionItem.id}
            handleCloseModalCallback={resetForm}
            initialData={componentItems.find((item) => item.component_id === editingComponent.id)}
            onSave={(updatedData) => handleEditComponent(editingComponent.id!, updatedData)}
            setComponentItems={setComponentItems}
          />
        )}
      </Modal>

      <Modal
        title={t('sectionItem.deleteComponentConfirmation')}
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <Button onClick={handleCloseDeleteModal} variant="outlined" fullWidth>
              {t('common.cancel')}
            </Button>
            <Button color="error" onClick={handleDeleteComponent} fullWidth>
              {t('common.confirm')}
            </Button>
          </DialogActions>
        }
      />
    </Container>
  );
};

export default CourseSectionItem;
