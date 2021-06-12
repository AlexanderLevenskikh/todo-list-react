import React, { FC, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { ITodoListItemNode } from 'root/models/todoListItem';

interface IProps {
    item: ITodoListItemNode;
}

export const TodoListItem: FC<IProps> = ({ item }) => {
    const [commentDraft, setCommentDraft] = useState(item.comment);
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    useEffect(() => {
        setCommentDraft(item.comment);
    }, [item.comment]);

    return useObserver(() => <span>{item.comment}</span>);

    function saveChanges() {
        item.toggleIsCompleted();
    }
};
