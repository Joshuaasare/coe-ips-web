/*
 * @Author: Jephthah
 * @Date: 2019-06-18 23:03:55
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-29 08:57:41
 * @flow
 */

import React from 'react';
import Pagination from 'react-js-pagination';

type Props = {
  activePage: number,
  itemsCountPerPage: number,
  totalItemsCount: number,
  onChange: any => void,
  title?: string,
  extraClass?: string
};

const MyPagination = (props: Props) => {
  const start = (props.activePage - 1) * props.itemsCountPerPage;
  let end = start + props.itemsCountPerPage;
  end = end > props.totalItemsCount ? props.totalItemsCount : end;

  return (
    <div className={`pagination-div ${props.extraClass || ''}`}>
      <span>
        {`${start + 1} - ${end} of ${props.totalItemsCount} ${props.title ||
          ''}`}
      </span>
      <Pagination
        activePage={props.activePage}
        itemsCountPerPage={props.itemsCountPerPage}
        totalItemsCount={props.totalItemsCount}
        onChange={props.onChange}
      />
    </div>
  );
};

export default MyPagination;
