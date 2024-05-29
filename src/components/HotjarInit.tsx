"use client";

import { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const HotjarInit = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const siteId = 5004317;
      const hotjarVersion = 6;
      Hotjar.init(siteId, hotjarVersion);
    }
  }, []);

  return null;
};

export default HotjarInit;
