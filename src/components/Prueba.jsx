import { PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';

function Prueba() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const sendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider();
      const id = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        new RecaptchaVerifier('recaptcha-container')
      );
      setVerificationId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await auth.currentUser.updatePhoneNumber(credential);
      console.log('Número de teléfono actualizado');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor='phone'>Número de teléfono:</label>
      <input
        type='text'
        id='phone'
        value={phoneNumber}
        onChange={event => setPhoneNumber(event.target.value)}
      />
      <button onClick={sendVerificationCode}>
        Enviar código de verificación
      </button>
      {verificationId && (
        <div>
          <label htmlFor='code'>Código de verificación:</label>
          <input
            type='text'
            id='code'
            value={verificationCode}
            onChange={event => setVerificationCode(event.target.value)}
          />
          <button onClick={verifyCode}>Verificar código</button>
        </div>
      )}
    </div>
  );
}
export default Prueba;
