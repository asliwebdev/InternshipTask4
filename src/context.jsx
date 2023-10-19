import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import { getUserFromLocalStorage } from "./utils/localStorage";
import { toast } from "react-toastify";
import customFetch from "./utils/axios";

const AppContext = createContext();

const initialState = {
    users: [],
    user: getUserFromLocalStorage(),
    selectedUsers: [],
}

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getAllUsers = async () => {
        try {
            const response = await customFetch.get('/users');
            dispatch({type: 'displayUsers', payload: response.data})
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    const loginUser = (user) => {
        dispatch({type: 'loginUser', payload: user})
    }
   
    const registerUser = (user) => {
        dispatch({type: 'registerUser', payload: user})
    }
    
    const logoutUser = () => {
        toast.success("Logging out...");
        dispatch({type: 'logoutUser'})
    }

    const handleSelectedUser = (id) => {
        dispatch({type: 'handleSelectedUser', payload: {id}})
    }

    useEffect(() => {
        if(state.user) {
          getAllUsers();
        }
    }, [state.user])

    // Refactor and make one function instead of three separate ones to handle Actions
    const handleActions = async (selectedUsers, actionType, id = null) => {
        try {
          const response = await customFetch.patch('/users/action', { selectedUsers, actionType });

          toast.success(response.data.message);
      
          if (id && selectedUsers.includes(id) && (actionType === 'delete' || actionType === 'block')) {
            logoutUser();
          } else {
            getAllUsers();
          }
      
          dispatch({ type: 'clearSelectedUsers' });
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message);
        }
      };
      

    const selectAllUsers = () => {
        dispatch({type: 'selectAllUsers'})
    }

    return <AppContext.Provider value={{...state, loginUser, registerUser, logoutUser, handleSelectedUser, 
    handleActions, selectAllUsers}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}