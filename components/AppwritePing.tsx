"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";
import { toast } from "sonner";

export function AppwritePing() {
  useEffect(() => {
    client.ping().then(() => {
      console.log("Appwrite connection verified");
      toast.success("Appwrite connected");
    }).catch((error) => {
      console.error("Appwrite connection failed:", error);
      toast.error("Appwrite connection failed");
    });
  }, []);

  return null;
}