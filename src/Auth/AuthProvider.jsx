import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../service/firebase/firebase";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(false);
  const [moment, setMoment] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  useEffect(() => {
    const type = localStorage.getItem("moment");
    setMoment(type);
  }, []);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentMe) => {
      setUser(currentMe);
    });
    return () => unSubscribe();
  }, []);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = () => {
    return signOut(auth);
  };
  const google = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const github = () => {
    return signInWithPopup(auth, githubProvider);
  };
  const contextProvider = {
    user,
    moment,
    setMoment,
    createUser,
    signInUser,
    signOutUser,
    google,
    github,
  };

  // ---------------------------------------------------
  return (
    <AuthContext.Provider value={contextProvider}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
