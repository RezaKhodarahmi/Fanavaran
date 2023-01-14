import {
  REQUEST_GET_USERS,
  SUCCESS_GET_USERS,
  FAIL_GET_USERS,
  REQUEST_GET_USER_ID,
  SUCCESS_GET_USER_ID,
  FAIL_GET_USER_ID,
  REQUEST_GET_USER_META,
  SUCCESS_GET_USER_META,
  FAIL_GET_USER_META,
  REQUEST_CREATE_USER_META,
  SUCCESS_CREATE_USER_META,
  FAIL_CREATE_USER_META,
  REQUEST_UPDATE_USER_META,
  SUCCESS_UPDATE_USER_META,
  FAIL_UPDATE_USER_META,
  REQUEST_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  FAIL_UPDATE_USER,
  REQUEST_CREATE_USER,
  SUCCESS_CREATE_USER,
  FAIL_CREATE_USER,
  REQUEST_GET_INSTRUCTORS,
  SUCCESS_GET_INSTRUCTORS,
  FAIL_GET_INSTRUCTORS
} from "../constants/userConstants";


export const createUserReducer = (state={loading:false,status:null,message:null,error:null},action)=>{
  switch (action.type) {
    case REQUEST_CREATE_USER:
      return { loading: true, status: null };
    case SUCCESS_CREATE_USER:
      return { loading: false, status: 200 };
    case FAIL_CREATE_USER:
      return { loading: false, error:action.status,message:action.message };
    default:
      return state;
  }
}

export const userReducer = (
  state = { loading: false, users: [], err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_USERS:
      return { loading: true, users: null };
    case SUCCESS_GET_USERS:
      return { loading: false, users: action.payload };
    case FAIL_GET_USERS:
      return { loading: false, err: action.payload, users: null };
    default:
      return state;
  }
};

export const instructorReducer = (
  state = { loading: false, instructors: [], err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_INSTRUCTORS:
      return { loading: true, instructors: null };
    case SUCCESS_GET_INSTRUCTORS:
      return { loading: false, instructors: action.payload };
    case FAIL_GET_INSTRUCTORS:
      return { loading: false, err: action.payload, instructors: null };
    default:
      return state;
  }
};
export const userByIdReducer = (
  state = { loading: false, user: [], err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_USER_ID:
      return { loading: true, user: null };
    case SUCCESS_GET_USER_ID:
      return { loading: false, user: action.payload };
    case FAIL_GET_USER_ID:
      return { loading: false, err: action.payload, user: null };
    default:
      return state;
  }
};
export const CreateUserMetaReducer = (
  state = { loading: false,success: false, userMeta: [], err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_CREATE_USER_META:
      return { loading: true, userMeta: null };
    case SUCCESS_CREATE_USER_META:
      return { loading: false,success:true, userMeta: action.payload };
    case FAIL_CREATE_USER_META:
      return { loading: false, success: false, err: true };
    default:
      return state;
  }
};
export const updateUserReducer = (
  state = { loading: false,success: false, date: [], err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_UPDATE_USER:
      return { loading: true, data: null };
    case SUCCESS_UPDATE_USER:
      return { loading: false,success:true, data: action.payload };
    case FAIL_UPDATE_USER:
      return { loading: false, success: false, err: true };
    default:
      return state;
  }
};

export const getUserMetaReducer = (
  state = { loading: false, userMeta: [], err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_USER_META:
      return { loading: true, userMeta: null };
    case SUCCESS_GET_USER_META:
      
      return { loading: false, userMeta: action.payload };
    case FAIL_GET_USER_META:
      return { loading: false, userMeta: action.payload, userMeta: null };
    default:
      return state;
  }
};


export const updateUserMetaReducer =(state = {loading:false,success:false,err:false},action)=>{
  switch(action.type){
    case REQUEST_UPDATE_USER_META:
      return { loading: true, success: false };
    case SUCCESS_UPDATE_USER_META:
      
      return { loading: false, success:true };
    case FAIL_UPDATE_USER_META:
      return { loading: false, err:true };
    default:
      return state;
  }
}