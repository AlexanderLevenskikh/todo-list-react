import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { ITodoListItemNode } from 'root/models/todoListItem';

interface IProps {
    item: ITodoListItemNode;
}

export const TodoListItem: FC<IProps> = observer(({ item }) => {
    const [commentDraft, setCommentDraft] = useState(item.comment);
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    useEffect(() => {
        setCommentDraft(item.comment);
    }, [item.comment]);

    return editModeEnabled ? (
        <div>
            <input type='text' value={commentDraft} onChange={editComment} />
            <input type='button' value='Submit' onClick={saveChanges} />
            <input type='button' value='Cancel' onClick={disableEditMode} />
        </div>
    ) : (
        <div>
            <span onClick={toggleCompleted}>{item.comment}</span>
            <input type='button' value='Edit' onClick={enableEditMode} />
            <input type='button' value='Remove' onClick={removeItem} />
        </div>
    );

    function editComment(event: SyntheticEvent<HTMLInputElement>) {
        setCommentDraft(event.currentTarget.value);
    }

    function enableEditMode() {
        setEditModeEnabled(true);
    }

    function disableEditMode() {
        setEditModeEnabled(false);
    }

    function saveChanges() {
        item.edit(commentDraft);
        disableEditMode();
    }

    function removeItem() {
        item.remove();
    }

    function toggleCompleted() {
        item.toggleIsCompleted();
    }
});
