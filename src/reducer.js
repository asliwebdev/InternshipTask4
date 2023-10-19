import { addUserToLocalStorage, removeUserFromLocalStorage } from "./utils/localStorage";

const reducer = (state, action) => {
  if(action.type === 'loginUser' || action.type === 'registerUser') {
    const user = {...action.payload.user, token: action.payload.token}
    addUserToLocalStorage(user);
    return {...state, user}
  }
  if(action.type === 'logoutUser') {
    removeUserFromLocalStorage();
    return {...state, user: null, selectedUsers: []}
  }
  if(action.type === 'displayUsers') {
    const {users} = action.payload;
    return {...state, users}
  }
  if(action.type === 'handleSelectedUser') {
    const {selectedUsers} = state;
    const {id} = action.payload;
    let newSelectedUsers;
    if(selectedUsers.includes(id)) {
      newSelectedUsers = selectedUsers.filter(userId => userId !== id)
    } else {
      newSelectedUsers = [...selectedUsers, id];
    }
    return {...state, selectedUsers: newSelectedUsers}
  }
  if(action.type === 'clearSelectedUsers') {
    return {...state, selectedUsers: []}
  }
  if(action.type === 'selectAllUsers') {
    const {users, selectedUsers} = state;
    let newSelectedUsers;
    if(selectedUsers.length === 0) {
      newSelectedUsers = users.map(user => user._id);
    } else {
      newSelectedUsers = [];
    }
    return {...state, selectedUsers: newSelectedUsers}
  }
}

export default reducer