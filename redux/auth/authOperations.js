import db from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { authSlice } from "./authReducer";

const auth = getAuth();

//! Register and update user profile ------------------------------
export const authSignUpUser =
  ({ avatar, email, login, password }) =>
  async (dispatch, getState) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: avatar,
        })
          .then(() => {})
          .catch((error) => {
            console.log("Помилка оновлення", error.message);
          });

        const { uid, photoURL, displayName, email } = auth.currentUser;
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: uid,
            avatar: photoURL,
            login: displayName,
            email: email,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Помилка реєстрації", errorMessage);
      });
  };

//! logIn --------------------------------------------------------
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Помилка входу", errorMessage);
      });
  };

//! Refresh  -------------------------------------------------------
export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    // console.log("User", user);
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          avatar: user.photoURL,
          login: user.displayName,
          email: user.email,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

//! logOut ---------------------------------------------------------------
export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};
