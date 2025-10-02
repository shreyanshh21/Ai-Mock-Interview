"use client";

import { useEffect } from "react";
import { db } from "@/firebase/client";
import { collection, getDocs } from "firebase/firestore";

export default function TestFirestorePage() {
  useEffect(() => {
    async function testFirestore() {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        console.log("✅ Firestore connection successful!");
      } catch (err) {
        console.error("❌ Firestore connection failed:", err);
      }
    }

    testFirestore();
  }, []);

  return <div>Check the browser console for Firestore test results ✅</div>;
}
