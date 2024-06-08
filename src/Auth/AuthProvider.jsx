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
import { toast } from "sonner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moment, setMoment] = useState(false);
  const [isImage, setIsImage] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  useEffect(() => {
    const type = localStorage.getItem("moment");
    setMoment(type);
  }, []);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentMe) => {
      setLoading(false);
      setUser(currentMe);
      // send email to verify token to server side jwt api
      const user = { email: currentMe?.email };
      if (currentMe) {
        axios
          .post("http://localhost:1000/jwt", user, { withCredentials: true })
          .then((jwt) => {
            console.log(jwt?.data);
          });
      } else {
        axios
          .post("http://localhost:1000/logout", user, { withCredentials: true })
          .then((log) => {
            console.log(log);
          });
      }

      // check user is block or not
      axiosSecure.get(`/user_check?email=${currentMe?.email}`).then((res) => {
        setIsBlock(res.data?.block);
      });
      // send data to database
      if (isPro) {
        const info = {
          name: currentMe?.displayName,
          email: currentMe?.email,
          emailVerified: currentMe?.emailVerified,
          image: isImage,
          uId: currentMe?.uid,
          admin: false,
          block: false,
          lastLogin: currentMe?.metadata?.lastSignInTime,
          lastSignIn: currentMe?.metadata?.lastSignInTime,
          createTime: currentMe?.metadata?.creationTime,
        };
        axiosSecure.post("/user", info).then((res) => {
          console.log(res.data);
        });
      }
      if (isBlock) {
        signOut(auth);
        toast.warning("Your email has been block by admin !");
      }
    });
    return () => unSubscribe();
  }, [auth, axiosSecure, isImage, isPro, isBlock]);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const google = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const github = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  const handleCooking = (title) => {
    return toast.warning(title);
  };
  const contextProvider = {
    user,
    loading,
    moment,
    isImage,
    isPro,
    isBlock,
    setIsPro,
    setIsImage,
    setMoment,
    createUser,
    signInUser,
    signOutUser,
    google,
    github,
    handleCooking,
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
