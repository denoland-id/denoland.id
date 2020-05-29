import * as React from "react";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Stack,
  useDisclosure,
} from "@chakra-ui/core";
import { FaGithub, FaTelegramPlane, FaTwitter } from "react-icons/fa";

import { Link } from "@/components";
import routes from "@/routes";
import { useRouter } from "next/router";
import useSiteConfig from "@/hooks/use-site-config";

const Navbar: React.FC = () => {
  const siteConfig = useSiteConfig();

  const { pathname } = useRouter();
  const isHome = pathname === "/";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuRef = React.useRef();

  const Home = () => (
    <Link fontSize={["lg", "2xl"]} fontWeight="extrabold" href="/" isNextLink>
      <Stack isInline alignItems="center" pr={4} spacing={4}>
        <Icon name="denolandid" size="48px" />
        <Box lineHeight="none" overflowWrap="break-word">
          {siteConfig.title}
        </Box>
      </Stack>
    </Link>
  );

  return (
    <Box
      backgroundColor="gray.50"
      borderBottomColor="gray.200"
      borderBottomWidth={isHome ? 0 : 1}
      letterSpacing="tight"
    >
      <Box
        as="nav"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        maxW="5xl"
        mx="auto"
        p={8}
      >
        <Box>
          <Home />
        </Box>

        <Box display={["block", , , "none"]}>
          <Button
            backgroundColor="gray.50"
            _hover={{ backgroundColor: "gray.100", color: "gray.200" }}
            onClick={onOpen}
            p={2}
            ref={menuRef}
          >
            <Icon color="gray.400" name="menu" size="24px" />
          </Button>
        </Box>

        <Stack
          display={["none", , , "block"]}
          color="gray.600"
          fontWeight="semibold"
          isInline
          spacing={6}
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
      </Box>

      <Drawer
        finalFocusRef={menuRef}
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p={8} pb={0}>
            <Stack alignItems="center" justifyContent="space-between" isInline>
              <Home />
              <Button
                backgroundColor="white"
                _hover={{ backgroundColor: "gray.100", color: "gray.200" }}
                onClick={onClose}
                p={2}
                ref={menuRef}
              >
                <Icon color="gray.400" name="close" size="18px" />
              </Button>
            </Stack>
          </DrawerHeader>

          <DrawerBody px={8}>
            <Stack fontWeight="semibold" spacing={4}>
              {routes.map(({ children, href, isExternal }, i) => (
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
          </DrawerBody>

          <DrawerFooter fontSize="xl" justifyContent="flex-start" p={8} pt={0}>
            <Stack isInline spacing={4}>
              <Link href={siteConfig.socials.github} isExternal>
                <Box as={FaGithub} />
              </Link>
              <Link href={siteConfig.socials.telegram} isExternal>
                <Box as={FaTelegramPlane} />
              </Link>
              <Link href={siteConfig.socials.twitter} isExternal>
                <Box as={FaTwitter} />
              </Link>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
