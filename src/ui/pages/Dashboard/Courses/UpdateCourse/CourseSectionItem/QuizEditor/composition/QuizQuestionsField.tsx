import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import Box from '@mui/material/Box';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Control, useFieldArray } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { Button, Typography as Typo } from '@/ui/components';

import { QuizFormValues } from './types';
import QuestionListItem from './QuestionListItem';
import QuestionEditorModal from './QuestionEditorModal';
import QuestionFormModal from './QuestionFormModal';

const QuizQuestionsField = ({
  control,
  setValue,
}: {
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
}) => {
  const { t } = useTranslation();

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
    move: moveQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const handleQuestionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((question) => question.id === active.id);
    const newIndex = questions.findIndex((question) => question.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      moveQuestion(oldIndex, newIndex);
    }
  };

  const handleRemoveQuestion = (index: number) => {
    if (editingQuestionIndex === index) {
      setEditingQuestionIndex(null);
    } else if (editingQuestionIndex !== null && editingQuestionIndex > index) {
      setEditingQuestionIndex(editingQuestionIndex - 1);
    }

    removeQuestion(index);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typo component="h4" variant="h6">
          {t('quiz.questions')}
        </Typo>
        <Typo variant="caption" color="text.secondary">
          {t('quiz.dragToReorder')}
        </Typo>
      </Box>

      {questions.length === 0 && (
        <Typo variant="body2" color="text.secondary">
          {t('quiz.noQuestionsYet')}
        </Typo>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleQuestionDragEnd}
      >
        <SortableContext
          items={questions.map((question) => question.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {questions.map((question, questionIndex) => (
              <QuestionListItem
                key={question.id}
                control={control}
                questionIndex={questionIndex}
                questionId={question.id}
                onEdit={() => setEditingQuestionIndex(questionIndex)}
                onRemove={() => handleRemoveQuestion(questionIndex)}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>

      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setIsAddingQuestion(true)}
      >
        {t('quiz.addQuestion')}
      </Button>

      <QuestionFormModal
        open={isAddingQuestion}
        onClose={() => setIsAddingQuestion(false)}
        onSave={(question) => appendQuestion(question)}
      />

      {editingQuestionIndex !== null && (
        <QuestionEditorModal
          open={editingQuestionIndex !== null}
          questionIndex={editingQuestionIndex}
          onClose={() => setEditingQuestionIndex(null)}
          control={control}
          setValue={setValue}
        />
      )}
    </Box>
  );
};

export default QuizQuestionsField;
