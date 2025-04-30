import { useEffect, useState } from "react";
import { Slot, useRouter, useRootNavigationState } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function Layout() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isReadyToCheckAuth, setIsReadyToCheckAuth] = useState(false);

  useEffect(() => {
    if (navigationState?.key) {
      setIsReadyToCheckAuth(true);
    }
  }, [navigationState]);

  useEffect(() => {
    if (!isReadyToCheckAuth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });

    return unsubscribe;
  }, [isReadyToCheckAuth]);

  return <Slot />;
}