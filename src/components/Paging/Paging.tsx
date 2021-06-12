import React, { FC, SyntheticEvent } from 'react';
import { AVAILABLE_PAGING_LIMITS } from 'root/constants/paging';

interface IProps {
    activePage: number;
    pagesCount: number;
    changePage(pageNumber: number): void;
    changeItemsPerPage(itemsPerPage: number): void;
}

export const Paging: FC<IProps> = ({ pagesCount, activePage, changePage, changeItemsPerPage }) => {
    return (
        <div>
            <ul>
                {Array.from(Array(pagesCount)).map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                        <li>
                            <input type='button' value={pageNumber} onClick={() => changePage(pageNumber)} />
                        </li>
                    );
                })}
            </ul>

            <select onChange={onChangeItemsPerPage}>
                {AVAILABLE_PAGING_LIMITS.map((currentLimit) => (
                    <option value={currentLimit}>{currentLimit}</option>
                ))}
            </select>
        </div>
    );

    function onChangeItemsPerPage(event: SyntheticEvent<HTMLSelectElement>) {
        changeItemsPerPage(parseInt(event.currentTarget.value));
    }
};
