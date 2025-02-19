export const API_PATHS: {
  AUTH: {
    LOGIN: string;
    SIGNUP: string;
    GET_USER_INFO: string;
    UPDATE_PROFILE: string;
  };
  POLLS: {
    CREATE: string;
    GET_ALL: string;
    GET_BY_ID: (pollId: string) => string;
    VOTE: (pollId: string) => string;
    CLOSE: (pollId: string) => string;
    BOOKMARK: (pollId: string) => string;
    GET_BOOKMARKED: string;
    VOTED_POLLS: string;
    DELETE: (pollId: string) => string;
  };
  IMAGE: {
    UPLOAD_IMAGE: string;
  };
} = {
  AUTH: {
    LOGIN: '/api/v1/auth/signin',
    SIGNUP: '/api/v1/auth/signup',
    GET_USER_INFO: '/api/v1/auth/getUser',
    UPDATE_PROFILE: '/api/v1/auth/update'
  },
  POLLS: {
    CREATE: "/api/v1/poll/create",
    GET_ALL: "/api/v1/poll/getAllPolls",
    GET_BY_ID: (pollId:string) => `/api/v1/poll/${pollId}`,
    VOTE: (pollId:string) => `/api/v1/poll/${pollId}/vote`,
    CLOSE: (pollId:string) => `/api/v1/poll/${pollId}/close`,
    BOOKMARK: (pollId:string) => `/api/v1/poll/${pollId}/bookmark`,
    GET_BOOKMARKED:"/api/v1/poll/user/bookmarked",
    VOTED_POLLS:"/api/v1/polls/votedPolls",
    DELETE:(pollId:string) => `/api/v1/poll/${pollId}/delete`,
  },
  IMAGE:{
     UPLOAD_IMAGE:'/api/v1/auth/upload-image',
   }
}