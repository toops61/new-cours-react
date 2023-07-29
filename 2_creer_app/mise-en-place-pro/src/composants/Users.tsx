import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { getData } from "../redux/usersSlice";

interface usersProps {
  openUsers: boolean;
}

export default function Users(props:usersProps) {
  const dispatch = useAppDispatch();
  
  const users = useAppSelector((state : RootState) => state.usersSlice);

  if (!users.data &&!users.loading && !users.error) {
    dispatch(getData());
  }
  
  return (
    props.openUsers ? (users.error ? <div className="error-display"><p>An error has occured</p></div> : 
    <ul className="users-list">
      {users.data?.map(user => <li key={user.id}>
        <p>{user.name}</p>
        <div className="separation"></div>
        <p>{user.username}</p>
      </li>)}
    </ul>) : <></>
  )
}