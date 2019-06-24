import React from 'react';

const FilterArticleBy = props => {
  const { articles, onChange } = props;
  return (
    <div className="text-center">
      <select onChange={onChange}>
        <option disabled selected>
          filter by
        </option>
        <option value={articles.created_at}>created_at</option>
        <option value={articles.comment_count}>comment_count</option>
        <option value={articles.votes}>votes</option>
      </select>
    </div>
  );
};

export default FilterArticleBy;
