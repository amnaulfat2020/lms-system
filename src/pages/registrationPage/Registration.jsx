import React, { useState } from 'react';
import './registration.css'; 
import image from "../../assets/images/register.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../utils/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getUserIdByEmail } from "../../utils/Firebase";
import { auth, firestore } from "../../utils/Firebase";
// const Registration = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { email, password, firstName, lastName, username } = formData;
//       // Create user account using Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//       const user = userCredential.user;

//       // Store additional user data in the user object itself (optional)
//       await user.updateProfile({
//         displayName: username
//       });

//       console.log('User registered successfully:', user);
//     } catch (error) {
//       console.error('Error registering user:', error.message);
//     }
//   };
const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData;
      // Create user account using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      // Store additional user data in Firestore
      await setDoc(doc(collection(firestore, 'users'), user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email
      });

      console.log('User registered successfully:', user);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };
  return (
    <div className="registration-container">
      <div className="registration-content">
        <h2>Welcome to our Learning Management System!</h2>
        <p>Begin your journey of knowledge and growth by creating an account with us. Access a wide range of courses, resources, and tools to enhance your learning experience.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="image-container">
        <img src={image} alt="LMS Image" />
      </div>
    </div>
  );
};

export default Registration;
