import React, { useEffect } from "react";
import UserService from "../../Services/Travlog/UserService";
import { useState } from "react";
import getTimeDifference from "../../Functions/timeDifference";
import ImageService from "../../Services/Images/ImageService";
import "./Article.scss";
import Comments from "../Comments/Comments";
import InteractionsService from "../../Services/Travlog/InteractionsService";
import GlobalService from "../../Services/Travlog/GlobalService";
import PostService from "../../Services/Travlog/PostService";
import { useDispatch, useSelector } from "react-redux";
import { deleted } from "../../Features/deleteArticleSlice";

export default function Article({
  title,
  description,
  user_id,
  createdAt,
  rating,
  maps,
  city,
  id,
  profile,
}) {
  // VARIABLES
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const [content, setContent] = useState("");
  const [submit, setIsSubmit] = useState(false);
  const [comments, setComments] = useState([]);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [editMode, setEditMode] = useState(false);
  const [type, setType] = useState("");
  const ArticleDeleted = useSelector((state) => {
    return state.deleteArticle.isDeleted;
  });

  //USEFFECT
  useEffect(() => {
    if (maps) setType("route");
    else setType("post");
    getUserById();
    getImage();
    getArticle();
  }, [submit, ArticleDeleted]);

  //GET COMMENTS
  const getArticle = async () => {
    const res = await GlobalService.getRouteOrPostById(id);
    setComments(res.comments);
  };

  // GET TIME DIFF
  const timeCreated = getTimeDifference(createdAt);

  //GET USER NAME
  const getUserById = async () => {
    const result = await UserService.getUserById(user_id);
    setUser(result);
  };
  //GET IMAGE OF THE PLACE
  const getImage = async () => {
    if (city) {
      const result = await ImageService.getImage(city);
      return setImage(result);
    }
  };

  //HANDLE COMMENT
  const handleChange = (ev) => {
    setContent(ev.target.value);
  };

  const handleMakeComment = async () => {
    try {
      const user = localStorage.getItem("USER");

      await InteractionsService.makeComment(id, user, content);
      setContent("");
      setIsSubmit(!submit);
    } catch (error) {
      console.log(error);
    }
  };

  //PRINT THE COMMENTS
  const printComments = comments.map((comment) => {
    return (
      <Comments
        content={comment.content}
        user_id={comment.user_id}
        rating={comment.rating}
        date={comment.updatedAt}
        key={comment._id}
      />
    );
  });

  // EDIT POST,  SAVE THE CHANGES
  const handleSave = async () => {
    const loggedUser = localStorage.getItem("USER");
    const details = {
      title: newTitle,
      description: newDescription,
      user_id: loggedUser,
    };
    setEditMode(!editMode);
    if (maps) setType("route");
    else setType("post");
    await PostService.updatePost(details, type, id);
  };

  //DELETE POST
  const handleDelete = async () => {
    if (maps) setType("route");
    else setType("post");
    await PostService.deletePost(id, type);
    dispatch(deleted());
  };

  return (
    <div className="article-root">
      <div>
        {profile ? (
          editMode ? (
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          ) : (
            <button onClick={() => setEditMode(!editMode)}>Edit</button>
          )
        ) : (
          <></>
        )}
      </div>
      <div>
        Title:
        {editMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        ) : (
          newTitle
        )}
      </div>
      <div>
        Description:
        {editMode ? (
          <input
            type="text"
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
          />
        ) : (
          newDescription
        )}
      </div>
      <div>User: {user.name}</div>

      <div>{timeCreated}</div>
      <div>{rating}</div>
      <div>{maps}</div>
      <div>{image ? <img src={image} /> : <div></div>}</div>
      <div>
        Comments: {comments.length}
        {printComments}
      </div>
      <div>
        <input type="text" onChange={handleChange} value={content} />
        <button onClick={handleMakeComment}>SUBMIT</button>
      </div>
    </div>
  );
}
