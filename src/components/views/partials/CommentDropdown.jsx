import { useState } from 'react';

const CommentDropdown = () => {
  const [ dropDownVal, setDropDownVal ] = useState(null);
  const [ isDropDownOpen, setDropDownOpen ] = useState(false);
  return (
    <>
    <div>
      <button>Latest</button>
      <button>Most Liked</button>
      <button>Oldest</button>
    </div>
    </>
  )
};

export default CommentDropdown;
