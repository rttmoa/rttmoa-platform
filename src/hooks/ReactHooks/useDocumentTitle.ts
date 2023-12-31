import React, { useEffect } from "react";

export default function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Rttmoa";
    };
  }, [title]);
}

// useDocumentTitle("个人中心")
