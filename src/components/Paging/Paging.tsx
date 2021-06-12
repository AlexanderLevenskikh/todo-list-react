import React, { FC, SyntheticEvent } from 'react';
import { AVAILABLE_PAGING_LIMITS } from 'root/constants/paging';
import { Button, Pagination, SegmentedControl, Select, SelectMenu } from 'evergreen-ui';
import styles from './styles.less';

interface IProps {
    activePage: number;
    pagesCount: number;
    itemsPerPage: number;
    changePage(pageNumber: number): void;
    changeItemsPerPage(itemsPerPage: number): void;
}

const options = [
    { label: '5', value: '5' },
    { label: '15', value: '15' },
    { label: '50', value: '50' },
];

export const Paging: FC<IProps> = (props) => {
    const { pagesCount, activePage, changePage, changeItemsPerPage, itemsPerPage } = props;

    return (
        <div className={styles.pagination}>
            <Pagination
                page={activePage}
                totalPages={pagesCount}
                onPageChange={changePage}
                onNextPage={goToNextPage}
                onPreviousPage={goToPrevPage}
            />

            <SegmentedControl
                options={options}
                value={itemsPerPage.toString()}
                onChange={(value: any) => changeItemsPerPage(parseInt(value))}
                className={styles.switcher}
            />
        </div>
    );

    function goToNextPage() {
        const nextPage = activePage + 1;
        changePage(nextPage > pagesCount ? pagesCount : nextPage);
    }

    function goToPrevPage() {
        const prevPage = activePage - 1;
        changePage(prevPage < 0 ? 0 : prevPage);
    }

    function onChangeItemsPerPage(event: SyntheticEvent<HTMLSelectElement>) {
        changeItemsPerPage(parseInt(event.currentTarget.value));
    }
};
