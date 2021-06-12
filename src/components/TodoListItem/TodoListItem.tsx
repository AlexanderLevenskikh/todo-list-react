import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { ITodoListItemNode } from 'root/models/todoListItem';
import styles from './styles.less';
import { Button, CircleIcon, TextInputField, TickCircleIcon } from 'evergreen-ui';
import { MAX_TODO_LENGTH } from 'root/constants/maxTodoLength';

interface IProps {
    item: ITodoListItemNode;
}

export const TodoListItem: FC<IProps> = observer(({ item }) => {
    const [commentDraft, setCommentDraft] = useState(item.comment);
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    useEffect(() => {
        setCommentDraft(item.comment);
    }, [item.comment]);

    return (
        <div className={styles.wrapper}>
            {editModeEnabled ? (
                <>
                    <div className={styles.inputWrapper}>
                        <TextInputField value={commentDraft} onChange={editComment} maxLength={MAX_TODO_LENGTH} />
                    </div>

                    <div className={styles.buttonsWrapper}>
                        <Button marginRight={8} appearance='primary' onClick={saveChanges}>
                            Submit
                        </Button>
                        <Button onClick={disableEditMode}>Cancel</Button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.commentWrapper} onClick={toggleCompleted}>
                        <span className={styles.icon}>
                            {item.isCompleted ? (
                                <TickCircleIcon color='success' size={24} />
                            ) : (
                                <CircleIcon color='muted' size={24} />
                            )}
                        </span>
                        <span>{item.comment}</span>
                    </div>
                    <div className={styles.buttonsWrapper}>
                        <Button marginRight={8} appearance='primary' onClick={enableEditMode}>
                            Edit
                        </Button>
                        <Button onClick={removeItem} intent='danger'>
                            Remove
                        </Button>
                    </div>
                </>
            )}
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
