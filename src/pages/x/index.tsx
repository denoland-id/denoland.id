import * as React from "react";

import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { NextSeo } from "next-seo";

const XPage: React.FC = () => {
  return (
    <Box maxW="4xl" mx="auto" p={8}>
      <NextSeo
        title="Third Party Modules"
        description="Deno Land Indonesia third party modules"
      />

      <Stack textAlign="center">
        <Heading as="h1">Third Party Modules</Heading>
        <Text>Laman ini masih dalam proses pengembangan ✌🏻</Text>
      </Stack>
    </Box>
  );
};

export default XPage;
