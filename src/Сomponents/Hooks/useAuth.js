import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export function useAuth(authFirebase) {
  const [authentication, setAuthentication] = useState(null);

  const provider = new GoogleAuthProvider();

  const logIn = () =>
    signInWithPopup(authFirebase, provider).catch((error) =>
      console.log(error)
    );

  const logOut = () =>
    signOut(authFirebase).catch((error) => console.log(error));

  useEffect(() => {
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        setAuthentication(user);
      } else {
        setAuthentication(null);
      }
    });
  }, [authFirebase, authentication]);

  return { authentication, logIn, logOut };
}
