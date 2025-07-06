import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "../../../styles/CommentForm.module.css";

import sendIcon from "../../../assets/send.png";

const CommentForm = ({ setComments }) => {
  const commentTitleRef = useRef(null);
  const commentContentRef = useRef(null);

  const [titleCharacterCount, setTitleCharacterCount] = useState(0);
  const [commentCharacterCount, setCommentCharacterCount] = useState(0);
  const [postCommentErr, setPostCommentErr] = useState([]);

  const navigate = useNavigate();

  const { blogId } = useParams();

  const redirect = () => {
    navigate(0);
  };

  const characterCount = (input, e, setter) => {
    setter(input.current.value.length);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setPostCommentErr([]);
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      const formData = new FormData();
      formData.append("title", commentTitleRef.current.value);
      formData.append("comment", commentContentRef.current.value);
      formData.append("blogId", blogId);

      // setTimeout(() => {
      //   redirect();
      // }, 1000)

      await fetch("http://localhost:3000/comments/post-comment", {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            setPostCommentErr([...res.errors]);
          } else if (!res.errors) {
            fetch(`http://localhost:3000/comments/${blogId}`)
              .then((result) => result.json())
              .then((result) => setComments(result));
            commentTitleRef.current.value = '';
            commentContentRef.current.value = '';
          }
        })
        .catch((err) => {
          if (err) {
            console.error(err);
          }
        });
    }
  };

  return (
    <form>
      <fieldset className={styles.commentFormFieldset}>
        <legend className={styles.fieldsetLegend}>Send a Comment</legend>
        {postCommentErr.length == 0 ? null : (
          <ul className={styles.postCommentErrUl}>
            {postCommentErr.map((commentErr, indx) => {
              return (
                <li key={indx} className={styles.postCommentErrLi}>
                  {commentErr.msg}
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentTitle">Comment Title: </label>
          <div className={styles.titleInputCountCont}>
            <input
              maxLength={60}
              onChange={(e) =>
                characterCount(commentTitleRef, e, setTitleCharacterCount)
              }
              ref={commentTitleRef}
              className={styles.commentTitleInput}
              type="text"
              id="commentTitle"
              name="commentTitle"
              
            />
            <p
              className={`${styles.titleCharacterCount} ${
                titleCharacterCount > 60 ? styles.titleErrInput : null
              } activeInput`}
            >
              {titleCharacterCount} / 60
            </p>
          </div>
        </div>

        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentContent">Comment: </label>
          <div className={styles.titleInputCountCont}>
            <textarea
              rows="5"
              maxLength={255}
              ref={commentContentRef}
              className={styles.commentContentTextArea}
              name="commentContent"
              id="commentContent"
              onChange={(e) =>
                characterCount(commentContentRef, e, setCommentCharacterCount)
              }
              
            ></textarea>
            <p
              className={`${styles.titleCharacterCount} ${
                styles.titleCharacterCount
              } ${commentCharacterCount > 255 ? styles.titleErrInput : null}`}
            >
              {commentCharacterCount} / 255
            </p>
          </div>
        </div>
        <button onClick={handleCommentSubmit} className={styles.sendCommentBtn}>
          <p className={styles.sendCommentTxt}>Send</p>
          <img
            src={sendIcon}
            className={styles.commentFormBtnIcon}
            alt="send comment"
            width="30px"
            height="30px"
          />
        </button>
        {/* <a href="https://www.flaticon.com/free-icons/send" title="send icons">Send icons created by Freepik - Flaticon</a> */}
      </fieldset>
    </form>
  );
};

export default CommentForm;
