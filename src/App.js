import React, { useState, useEffect } from "react";

function PasswordKeeper() {
  //
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  //loading the password from local storage
  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  //adding password to the local storage
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const handleAddPassword = () => {
    if (newTitle && newPassword) {
      //setting the newtitle and newpassword using destructuring
      setPasswords([...passwords, { title: newTitle, password: newPassword }]);
      //after adding newpassword and newtitle make input feild empty
      setNewTitle("");
      setNewPassword("");
    }
  };

  // Function to handle editing of a password
  const handleEditPassword = (index) => {
    // Set the index of password being edited
    setEditIndex(index);
    // Get the password object at the specified index
    const editedPassword = passwords[index];
    // Set the newTitle and newPassword state with the values of the edited password
    setNewTitle(editedPassword.title);
    setNewPassword(editedPassword.password);
    // Delete the password from the list after editing
    handleDeletePassword(index);
  };

  // Function to handle deletion of a password
  const handleDeletePassword = (index) => {
    // Create a copy of the passwords array
    const updatedPasswords = [...passwords];
    // Remove the password at the specified index
    updatedPasswords.splice(index, 1);
    // Update the passwords state with the modified array
    setPasswords(updatedPasswords);
  };




  //function to save edited password 
  const handleSaveEdit = () => {
    if (newTitle && newPassword) {
      const updatedPasswords = [...passwords];

      updatedPasswords.splice(editIndex, 0, {
        title: newTitle,
        password: newPassword,
      });
      //setpassword to new value
      setPasswords(updatedPasswords);
      //clearing the input feild
      setNewTitle("");
      setNewPassword("");
      //resting editIndex to null
      setEditIndex(null);
    }
  };

  const filteredPasswords = passwords.filter((password) =>
    password.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Password Keeper</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
       
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* {checking for edit index is null or not if null means it will add as new if not null then it is edited} */}
        {editIndex !== null ? (
          <button onClick={handleSaveEdit}>Save</button>
        ) : (
          <button onClick={handleAddPassword}>Add</button>
        )}
      </div>
{/* counting the length of password  */}
      <p>Total Passwords: {passwords.length}</p>

      <ul>
        
        {filteredPasswords.map((password, index) => (
          <li key={index}>
            <div>Title: {password.title}</div>
            <div>Password: {password.password}</div>
            <button onClick={() => handleEditPassword(index)}>Edit</button>
            <button onClick={() => handleDeletePassword(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordKeeper;
