import * as React from "react";

import siteConfig from "~/site-config";

export const SiteConfigContext = React.createContext(siteConfig);

export const SiteConfigProvider: React.FC = ({ children }) => (
  <SiteConfigContext.Provider value={siteConfig}>
    {children}
  </SiteConfigContext.Provider>
);
