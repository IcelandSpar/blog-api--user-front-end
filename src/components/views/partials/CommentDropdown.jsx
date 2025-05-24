import {  } from 'react';

const CommentDropdown = ({dropDownStyle, handleChange}) => {

  return (
    <>
    <div className={dropDownStyle.dropDownCont}>
      <select className={dropDownStyle.dropDownSelect} onChange={handleChange}>
        <option value="Latest">Latest</option>
        <option value="Most Liked">Most Liked</option>
        <option value="Oldest">Oldest</option>
      </select>
    </div>
    </>
  )
};

export default CommentDropdown;
