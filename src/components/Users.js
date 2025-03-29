import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from "../context/notes/userContext";
import UserItem from "./UserItem";

const Users = (props) => {
    const context = useContext(userContext);
    const navigate = useNavigate();
    const { users, getUsers, editUser, deleteUser } = context;

    const [user, setUser] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    useEffect(() => {
        getUsers();
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    // Open Modal with User Data
    const updateUser = (currentUser) => {
        ref.current.click();
        setUser({
            id: currentUser.id,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            job : currentUser.job,
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleClick = () => {
        const first_name = `${user.first_name}`
        const last_name = `${user.last_name}`;
        const email = `${user.email}`
        // const job = ; // Mock job as API requires 'name' and 'job'
        editUser(user.id, first_name, last_name, email);
        refClose.current.click();
        props.showAlert("User Updated Successfully", "success");
    };

    // ✅ Filter Users based on Search Term
    const filteredUsers = props.searchTerm
        ? users.filter((user) =>
            `${user.first_name} ${user.last_name} ${user.email}`
                .toLowerCase()
                .includes(props.searchTerm.toLowerCase())
        )
        : users;

    return (
        <div>
            {/* Hidden button to trigger modal */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal for Editing User */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input
                                    name="first_name"
                                    onChange={handleChange}
                                    value={user.first_name}
                                    placeholder="First Name"
                                    minLength={2}
                                    required
                                />
                                <input
                                    name="last_name"
                                    onChange={handleChange}
                                    value={user.last_name}
                                    placeholder="Last Name"
                                    minLength={2}
                                    required
                                />
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={user.email}
                                    placeholder="Email"
                                    required
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={user.first_name.length < 2 || user.last_name.length < 2}
                                onClick={handleClick}
                            >
                                Update User
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Users */}
            {filteredUsers?.length > 0 ? (
                filteredUsers.map((user) => (
                    <UserItem
                        key={user.id}
                        updateUser={updateUser}
                        note={user}
                        isUserData={true}
                        deleteUser={deleteUser}
                        showAlert={props.showAlert}
                    />
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Users;
