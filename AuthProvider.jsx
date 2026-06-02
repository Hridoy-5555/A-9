import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock functions for assignment purposes
  const createUser = async (email, password) => {
    setUser({ email, displayName: "New User" });
    return true;
  };

  const signInUser = async (email, password) => {
    setUser({ email, displayName: "Jane Doe", photoURL: "https://i.ibb.co/mJR9Qxc/user.png" });
    return true;
  };

  const signInWithGoogle = async () => {
    setUser({ email: "google.user@gmail.com", displayName: "Google User", photoURL: "https://i.ibb.co/mJR9Qxc/user.png" });
    return true;
  };

  const logOut = async () => {
    setUser(null);
    return true;
  };

  const updateUserProfile = async (name, photo) => {
    setUser(prev => ({ ...prev, displayName: name, photoURL: photo }));
    return true;
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const authInfo = { user, loading, createUser, signInUser, signInWithGoogle, logOut, updateUserProfile };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
export default AuthProvider;