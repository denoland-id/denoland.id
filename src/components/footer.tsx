import * as React from "react";

import { Box, Stack, Text } from "@chakra-ui/core";
import { FaGithub, FaTelegramPlane, FaTwitter } from "react-icons/fa";

import { Link } from "@/components";
import routes from "@/routes";
import { useSiteConfig } from "@/hooks";

const Footer: React.FC = () => {
  const siteConfig = useSiteConfig();

  return (
    <Stack
      as="footer"
      color="gray.600"
      letterSpacing="tight"
      p={8}
      spacing={8}
      textAlign="center"
    >
      <Stack
        fontSize={["sm", "md"]}
        fontWeight="semibold"
        isInline
        justifyContent="center"
        spacing={[4, 8]}
      >
        {routes.map(({ children, href, isExternal }) => (
          <Link
            href={href}
            isExternal={isExternal}
            isNextLink={!isExternal}
            key={href}
          >
            {children}
          </Link>
        ))}
      </Stack>

      <Stack isInline justifyContent="center" spacing={6}>
        <Link href={siteConfig.socials.github} isExternal>
          <Box as={FaGithub} display="inline-block" fontSize="xl" />
        </Link>
        <Link href={siteConfig.socials.telegram} isExternal>
          <Box as={FaTelegramPlane} display="inline-block" fontSize="xl" />
        </Link>
        <Link href={siteConfig.socials.twitter} isExternal>
          <Box as={FaTwitter} display="inline-block" fontSize="xl" />
        </Link>
      </Stack>

      <Text fontSize="xs">
        MIT License &copy; {new Date().getFullYear()} &ndash; present{" "}
        <Link href="/" isNextLink>
          {siteConfig.title}
        </Link>
        .
      </Text>
    </Stack>
  );
};

export default Footer;
