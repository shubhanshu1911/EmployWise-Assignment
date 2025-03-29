import React, { useState } from "react";
import UserContext from "./userContext";


const UserState = (props) => {
    const host = "https://reqres.in";
    const [users, setUsers] = useState([]);

    // ✅ Get All Users
    const getUsers = async () => {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
            console.error("Authentication token not found");
            return;
        }
        
        try {
            const response = await fetch(`${host}/api/users?page=2`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();
            console.log(json);
            if (json.data) {
                setUsers(json.data);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // ✅ Delete a User
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${host}/api/users/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                console.log("User deleted successfully");
                setUsers(users.filter((user) => user.id !== id));
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // ✅ Edit a User
    const editUser = async (id, first_name, last_name, email) => {
        try {
            // API CALL
            const response = await fetch(`${host}/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: `${first_name} ${last_name}`, job: "zion resident" })
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const data = await response.json();
            console.log("Updated Data:", data);

            // Update state directly using the updated data
            const updatedUsers = users.map(user =>
                user.id === id ? { ...user, first_name, last_name, email, job: data.job } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserContext.Provider value={{ users, deleteUser, editUser, getUsers }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
