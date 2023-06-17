import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber
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

  /**login socials media */
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const loginWithGithub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  const loginWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider);
  };

  const resetPassword = email => sendPasswordResetEmail(auth, email);

  /**verifier phone number */
  // const sendOtpPhone = async phoneInput => {
  //   //auth
  //   const user = auth.currentUser;

  //   const phoneProvider = new PhoneAuthProvider(auth);

  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       'recaptcha-container',
  //       {
  //         size: 'invisible',
  //         callback: response => {
  //           console.log(response);
  //         },
  //         'expired-callback': () => {
  //           console.log(
  //             'La respuesta de reCAPTCHA ha caducado. Por favor, resuelve el reCAPTCHA nuevamente.'
  //           );
  //         }
  //       },
  //       auth
  //     );
  //   }

  //   const verificationID = await phoneProvider.verifyPhoneNumber(
  //     phoneInput,
  //     window.recaptchaVerifier
  //   );
  //   console.log(verificationID);

  //   return verificationID;
  // };

  // const verifyOTP = async (verificationID, verificationCode) => {
  //   const credential = PhoneAuthProvider.credential(
  //     verificationID,
  //     verificationCode
  //   );

  //   try {
  //     await updatePhoneNumber(auth.currentUser, credential);
  //     console.log('Updated phone number sucessfully');
  //   } catch (err) {
  //     console.log('Failed to update phone number');
  //     console.log(err);
  //   }
  // };

  //________________________--PRUEBA
  const updateUserPhone = async phoneI => {
    try {
      const user = auth.currentUser;

      const phoneProvider = new PhoneAuthProvider(auth);

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: response => {
              console.log(response);
            },
            'expired-callback': () => {
              console.log(
                'La respuesta de reCAPTCHA ha caducado. Por favor, resuelve el reCAPTCHA nuevamente.'
              );
            }
          },
          auth
        );
      }
      // const appVerifier = new RecaptchaVerifier('recaptcha-container');
      // console.log(window.recaptchaVerifier);
      const verificationID = await phoneProvider.verifyPhoneNumber(
        phoneI,
        window.recaptchaVerifier
      );
      const verificationCode = prompt('ingrese el codigo');
      // console.log(verificationCode);
      const credential = PhoneAuthProvider.credential(
        verificationID,
        verificationCode
      );
      console.log(credential);
      await updatePhoneNumber(user, credential);
      console.log('se actualizo tu telefono');
    } catch (err) {
      const errorMessages = {
        'auth/too-many-requests':
          'Max requests reached for today. Try again tomorrow.',
        'auth/invalid-verification-code':
          'Invalid verification code. Please enter a valid code.'
      };
      // console.log(err);
      const errorMessage =
        errorMessages[err.code] || 'An error occurred. Please try again.';
      throw new Error(errorMessage);
    }
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
        loginWithGithub,
        loginWithFacebook,
        resetPassword,
        updateUserPhone
      }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
