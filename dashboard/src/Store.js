import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { loginReducer, tokenCheckReducer } from "./reducers/authReducers";
import {
  createCourseReducer,
  editCourseReducer,
  getCourseByIdReducer,
  getCoursesReducer,
} from "./reducers/courseReducers";
import { postsCategoryReducer } from "./reducers/postsCategoryReducer";
import {
  cretePostReducer,
  postsReducer,
  SinglePostReducer,
} from "./reducers/postsReducer";
import {
  CreateUserMetaReducer,
  createUserReducer,
  getUserMetaReducer,
  updateUserMetaReducer,
  updateUserReducer,
  userByIdReducer,
  userReducer,
} from "./reducers/userReducer";
import { postsTagsReducer } from "./reducers/postsTagsReducer";
import { createCategoryReducer, editCategoryReducer, getCategoriesReducer, getCategoryByIdReducer } from "./reducers/categoryReducers";
const initialStae = {
  user: {},
  users: {},
};

const reducer = combineReducers({
  user: loginReducer,
  userById: userByIdReducer,
  users: userReducer,
  userCheckToken: tokenCheckReducer,
  getUserMeta: getUserMetaReducer,
  crateUserMeta: CreateUserMetaReducer,
  updatedUserMeta: updateUserMetaReducer,
  updateUser: updateUserReducer,
  createUserNew: createUserReducer,
  courses: getCoursesReducer,
  singleCourse: getCourseByIdReducer,
  newCourse: createCourseReducer,
  updateCourse: editCourseReducer,
  deleteCourse: editCourseReducer,
  posts: postsReducer,
  postCategory: postsCategoryReducer,
  postTag: postsTagsReducer,
  postNew: cretePostReducer,
  singlePost: SinglePostReducer,
  categories: getCategoriesReducer,
  newCategory:createCategoryReducer,
  singleCategory:getCategoryByIdReducer,
  editCategory:editCategoryReducer
});
const composeEhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialStae,
  composeEhancer(applyMiddleware(thunk))
);
export default store;
