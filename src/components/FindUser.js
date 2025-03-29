import React, { useState } from "react";
import Users from './Users';

const FindUser = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                }}
            />

            {/* Pass searchTerm to Users component */}
            <Users searchTerm={searchTerm} />
        </div>
    );
};

export default FindUser;
