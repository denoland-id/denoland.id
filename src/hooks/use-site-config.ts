import * as React from "react";

import { SiteConfigContext } from "@/store/site-config";

const useSiteConfig = () => {
  return React.useContext(SiteConfigContext);
};

export default useSiteConfig;
