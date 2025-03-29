import React, { useContext } from "react";
import noteContext from "../context/notes/userContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserItem = (props) => {
  const context = useContext(noteContext);
  const { deleteUser, deleteNote } = context;
  const { note, updateUser, isUserData } = props;
  // console.log(props)

  if (!note) {
    return <p>Loading data...</p>; // Display when note is undefined
  }

  return (
    <div className="note">
      {isUserData ? (
        <>
          <img src={note.avatar} alt={`${note?.first_name || ''} ${note?.last_name || ''}`} style={{ borderRadius: "50%", width: "80px" }} />
          <h1>{note?.first_name} {note?.last_name}</h1>
          <p>{note?.email}</p>
          <p>{note?.job}</p>
          <button onClick={() => {
            deleteUser(note.id);
            props.showAlert("User Deleted Successfully", "success");
          }}>
            <DeleteIcon />
          </button>
          <button onClick={() => {
            updateUser(note);
          }}>
            <EditIcon />
          </button>
        </>
      ) : (
        <>
          <h1>{note?.title || "Untitled Note"}</h1>
          <p>{note?.description || "No description available."}</p>
          <button onClick={() => {
            deleteNote(note._id);
            props.showAlert("Note Deleted Successfully", "success");
          }}>
            <DeleteIcon />
          </button>
          <button onClick={() => {
            updateUser(note);
          }}>
            <EditIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default UserItem;
