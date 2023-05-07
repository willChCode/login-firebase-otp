import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebase';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!useAuth) throw new Error('no existe el auth provider');
  return context;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const singUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const singIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = email => sendPasswordResetEmail(auth, email);

  //________________________--PRUEBA
  const updateUserPhone = async phoneI => {
    //auth
    const user = auth.currentUser;

    const phoneProvider = new PhoneAuthProvider();
    console.log(phoneProvider);

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: response => {
            console.log(response);
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        },
        auth
      );
    }
    console.log('--------------------------------------');
    console.log(auth);
    // const appVerifier = new RecaptchaVerifier('recaptcha-container');
    // console.log(window.recaptchaVerifier);

    const verificationID = await phoneProvider.verifyPhoneNumber(
      phoneI,
      window.recaptchaVerifier
    );

    const verificationCode = prompt('ingrese el codigo');

    const credential = signInWithPhoneNumber(
      auth,
      verificationID,
      verificationCode
    );
    console.log(credential);

    await user.updatePhoneNumber(credential);

    setUser(auth.currentUser);
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        singUp,
        singIn,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        updateUserPhone
      }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
