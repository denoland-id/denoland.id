import * as React from "react";

import { Box, List, ListItem, Stack, Text } from "@chakra-ui/core";

import { Link } from "../components";
import { NextSeo } from "next-seo";
import { useSiteConfig } from "../hooks";

const HomePage: React.FC = () => {
  const siteConfig = useSiteConfig();

  return (
    <Box>
      <NextSeo title={siteConfig.title} titleTemplate="%s" />

      <Box
        backgroundColor="gray.50"
        borderBottomColor="gray.200"
        borderBottomWidth={1}
      >
        <Stack
          letterSpacing="tight"
          lineHeight="shorter"
          maxW="4xl"
          mx="auto"
          p={16}
          pb={32}
          textAlign="center"
        >
          <Text fontSize={["4xl", "5xl"]} fontWeight="black">
            Deno Land Indonesia
          </Text>
          <Text fontSize="2xl">
            A <b>friendly</b> user group for <b>Deno users</b> from{" "}
            <b>Indonesia</b>.
          </Text>
        </Stack>
      </Box>

      <Stack maxW="2xl" mx="auto" px={8} py={[8, , 16]} spacing={4}>
        <Text>
          Deno merupakan runtime yang sederhana, modern, dan aman untuk
          JavaScript dan TypeScript yang menggunakan V8 dan dibangun dengan
          Rust.
        </Text>

        <List listStylePosition="outside" pl={4} styleType="disc">
          <ListItem>
            Aman secara default. Tidak ada akses file, jaringan, atau
            lingkungan, kecuali diaktifkan secara eksplisit.
          </ListItem>
          <ListItem>Mendukung TypeScript secara langsung.</ListItem>
          <ListItem>Rilis hanya dengan satu file executable.</ListItem>
          <ListItem>
            Memiliki utilitas bawaan seperti dependency inspector (deno info)
            dan pemformat kode (deno fmt).
          </ListItem>
          <ListItem>
            Memiliki satu set modul standar yang ditinjau (diaudit) yang dijamin
            untuk bekerja dengan Deno:{" "}
            <Link href="https://deno.land/std" isExternal i>
              deno.land/std
            </Link>
            .
          </ListItem>
        </List>

        <Text>
          Pelajari lebih lanjut laman resmi Deno (
          <Link href="https://deno.land" isExternal i>
            deno.land
          </Link>
          ).
        </Text>
      </Stack>
    </Box>
  );
};

export default HomePage;
