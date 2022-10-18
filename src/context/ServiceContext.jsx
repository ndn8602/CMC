import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubcribe();
    };
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const contentCollectionRef = collection(db, "content");
  const addContent = (newContent) => {
    return addDoc(contentCollectionRef, newContent);
  };

  const updateContent = (id, updatedContent) => {
    const contentDoc = doc(contentCollectionRef, id);
    return updateDoc(contentDoc, updatedContent);
  };

  const deleteContent = (id) => {
    const contentDoc = doc(db, "content", id);
    return deleteDoc(contentDoc);
  };

  const getAllContent = () => {
    return getDocs(contentCollectionRef);
  };

  const getContent = (id) => {
    const contentDoc = doc(db, "content", id);
    return getDoc(contentDoc);
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        addContent,
        updateContent,
        deleteContent,
        getAllContent,
        getContent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
