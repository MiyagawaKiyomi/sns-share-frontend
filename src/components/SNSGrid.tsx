import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface SNSIcon {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface SNSGridProps {
  icons: SNSIcon[];
  onReorder: (newOrder: SNSIcon[]) => void;
}

const SNSGrid: React.FC<SNSGridProps> = ({ icons, onReorder }) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(icons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sns-grid" direction="horizontal">
        {(provided) => (
          <GridContainer {...provided.droppableProps} ref={provided.innerRef}>
            {icons.map((icon, index) => (
              <Draggable key={icon.id} draggableId={icon.id} index={index}>
                {(provided) => (
                  <IconWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img src={icon.icon} alt={icon.name} />
                  </IconWrapper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </GridContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: move;

  img {
    max-width: 70%;
    max-height: 70%;
  }
`;

export default SNSGrid;