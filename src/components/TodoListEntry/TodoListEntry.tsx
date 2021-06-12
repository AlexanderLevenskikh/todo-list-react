import React, { FC, SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react';
import { useMst } from 'root/stores/react/useMst';
import { MAX_TODO_LENGTH } from 'root/constants/maxTodoLength';
import styles from './styles.less';
import { Button, TextInputField } from 'evergreen-ui';

export const TodoListEntry: FC = observer(() => {
    const { todoList } = useMst();
    const [commentDraft, setCommentDraft] = useState('');

    return (
        <div className={styles.wrapper}>
            <TextInputField
                value={commentDraft}
                onChange={editComment}
                maxLength={MAX_TODO_LENGTH}
                placeholder='Enter comment for new TODO'
            />
            <Button marginRight={8} appearance='primary' onClick={saveChanges}>
                Submit
            </Button>
        </div>
    );

    function editComment(event: SyntheticEvent<HTMLInputElement>) {
        setCommentDraft(event.currentTarget.value);
    }

    function saveChanges() {
        todoList.add(commentDraft);
    }
});
