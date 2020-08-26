import "@/stylesheets/html.css";

import * as React from "react";

import {
  Box,
  CSSReset,
  ColorModeProvider,
  Stack,
  ThemeProvider,
} from "@chakra-ui/core";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import { Footer, Navbar } from "@/components";

import { AppProps } from "next/app";
import NProgress from "nprogress";
import Router from "next/router";
import { SiteConfigProvider } from "@/store/site-config";
import theme from "@/theme";
import useSiteConfig from "@/hooks/use-site-config";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const CustomAppPage = ({ Component, pageProps, router }: AppProps) => {
  const siteConfig = useSiteConfig();
  const ogURL = "https://og.denoland.id";

  return (
    <SiteConfigProvider>
      <DefaultSeo
        title="Welcome!"
        titleTemplate={`%s · ${siteConfig.title}`}
        description={siteConfig.description}
        canonical={siteConfig.url + (router.asPath || "")}
        openGraph={{
          title: siteConfig.title,
          description: siteConfig.description,
          type: "website",
          site_name: siteConfig.title,
          images: [{ url: `${ogURL}${router.pathname}.png?fontSize=150px` }],
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: siteConfig.twitterUsername,
          site: siteConfig.twitterUsername,
        }}
      />

      <SocialProfileJsonLd
        type="person"
        name={siteConfig.title}
        url={siteConfig.url}
        sameAs={Object.values(siteConfig.socials)}
      />

      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <CSSReset
            config={({ colors }) => ({
              light: {
                color: colors.gray[900],
                bg: colors.white,
                borderColor: colors.gray[400],
                placeholderColor: colors.gray[400],
              },
              dark: {
                color: colors.white,
                bg: colors.gray[900],
                borderColor: colors.whiteAlpha[400],
                placeholderColor: colors.whiteAlpha[400],
              },
            })}
          />

          <Stack minH="100vh">
            <Navbar />
            <Box as="main" flexGrow={1} lineHeight="tall">
              <Component {...pageProps} />
            </Box>
            <Footer />
          </Stack>
        </ColorModeProvider>
      </ThemeProvider>
    </SiteConfigProvider>
  );
};

export default CustomAppPage;
