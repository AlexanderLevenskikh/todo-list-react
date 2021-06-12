import React, { FC, SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react';
import { useMst } from 'root/stores/react/useMst';
import { MAX_TODO_LENGTH } from 'root/constants/maxTodoLength';

export const TodoListEntry: FC = observer(() => {
    const { todoList } = useMst();
    const [commentDraft, setCommentDraft] = useState('');

    return (
        <div>
            <input type='text' value={commentDraft} onChange={editComment} maxLength={MAX_TODO_LENGTH} />
            <input type='button' value='Submit' onClick={saveChanges} />
        </div>
    );

    function editComment(event: SyntheticEvent<HTMLInputElement>) {
        setCommentDraft(event.currentTarget.value);
    }

    function saveChanges() {
        todoList.add(commentDraft);
    }
});
