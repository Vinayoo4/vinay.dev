"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";

export function AppwritePing() {
  useEffect(() => {
    client.ping().then(() => {
      console.log("Appwrite connection verified");
    }).catch((error) => {
      console.error("Appwrite connection failed:", error);
    });
  }, []);

  return null;
}