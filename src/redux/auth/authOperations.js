import app from "../../firebase/config";
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
import * as SecureStore from "expo-secure-store";

const auth = getAuth();

const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

const deleteStorage = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

//! Register and update user profile ------------------------------
export const authSignUpUser =
  ({ urlAvatar, email, login, password }) =>
  async (dispatch, getState) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: urlAvatar,
        })
          .then(() => {})
          .catch((error) => {
            console.log("Помилка оновлення", error.message);
          });

        const { uid, photoURL, displayName, email } = auth.currentUser;

        //* Зберігаю локально юзера
        save("JWT", JSON.stringify({ uid, photoURL, displayName, email }));

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
        const { uid, photoURL, displayName, email } = user;

        //* Зберігаю локально юзера
        save("JWT", JSON.stringify({ uid, photoURL, displayName, email }));
      })
      .catch((error) => {
        Alert.alert("Помилка входу", error.message);
      });
  };

//! Refresh  -------------------------------------------------------
export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, async (user) => {
    //* Дістаю юзера з local storage
    const savedUser = await SecureStore.getItemAsync("JWT");
    const parsedUser = JSON.parse(savedUser);

    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          token: user.accessToken,
          userId: user.uid,
          avatar: user.photoURL,
          login: user.displayName,
          email: user.email,
        })
      );

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    } else {
      dispatch(
        authSlice.actions.updateUserProfile({
          token: parsedUser.accessToken,
          userId: parsedUser.uid,
          avatar: parsedUser.photoURL,
          login: parsedUser.displayName,
          email: parsedUser.email,
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
  //* Видаляю юзера з local storage
  deleteStorage("JWT");
};
