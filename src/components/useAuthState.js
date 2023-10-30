// this custom hook intended to get the data of user that log in and put it inside useContaxt
import { useState, useEffect } from 'react';
import { auth } from '../firebaseShop';

function useAuthState() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => {
    //   console.log("User status changed:", _user);
      setUser(_user);
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  return user;
}

export default useAuthState;
