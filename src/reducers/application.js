export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
   switch (action.type) {
     case SET_DAY:
       return { ...state, day: action.value };
     case SET_APPLICATION_DATA:
       return {
         ...state,
         days: action.value[0].data,
         appointments: action.value[1].data,
         interviewers: action.value[2].data,
       };
     case SET_INTERVIEW: {
       return { ...action.newState };
     }
     default:
       throw new Error(
         `Tried to reduce with unsupported action type: ${action.type}`
       );
   }
 }