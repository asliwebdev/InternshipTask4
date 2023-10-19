import { useGlobalContext } from "../context";
import {FaRegMinusSquare} from 'react-icons/fa'
import { formatTime } from "../utils";

const UsersTable = () => {
    const {selectAllUsers, selectedUsers, handleSelectedUser, users} = useGlobalContext();
  return (
    <div className="mt-8 overflow-x-auto">
            <table className="table">
             <thead>
               <tr>
                 <th>
                   <span className="text-2xl cursor-pointer" onClick={selectAllUsers}><FaRegMinusSquare /></span>
                 </th>
                 <th><span className="responsive-text">ID</span></th>
                 <th><span className="responsive-text">Name</span></th>
                 <th><span className="responsive-text">e-Mail</span></th>
                 <th><span className="responsive-text">Last Login</span></th>
                 <th><span className="responsive-text">Registration time</span></th>
                 <th><span className="responsive-text">Status</span></th>
               </tr>
             </thead>
             <tbody>
              {
                users.map((user, index) => {
                  const {name, email, lastLogin, status, registrationTime, _id} = user;
                return <tr key={_id}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" 
                            onChange={() => handleSelectedUser(_id)} checked={selectedUsers.includes(_id)}/>
                          </label>
                        </th>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{formatTime(lastLogin)}</td>
                        <td>{formatTime(registrationTime)}</td>
                        <td>{status}</td>
                      </tr>
                })
              }
             </tbody>
            </table>
          </div>
  )
}

export default UsersTable