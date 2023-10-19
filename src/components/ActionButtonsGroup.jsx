import {FaLock, FaLockOpen, FaTrashAlt} from 'react-icons/fa'
import { useGlobalContext } from '../context'

const ActionButtonsGroup = () => {
    const {handleActions, user, selectedUsers} = useGlobalContext();
  return (
    <div className="flex items-center justify-start gap-x-6">
     <button type="button" className="btn" onClick={() => handleActions(selectedUsers, 'block', user._id)}>
       <FaLock /> Block
     </button>
     <button type="button" className="btn" onClick={() => handleActions(selectedUsers, 'unblock')}>
       <FaLockOpen />
     </button>
     <button type="button" className="btn btn-error text-white" onClick={() => handleActions(selectedUsers, 'delete', user._id)}>
       <FaTrashAlt />
     </button>
    </div>
  )
}

export default ActionButtonsGroup