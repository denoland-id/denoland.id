import * as React from "react";

import { Box, Divider, Stack, Text } from "@chakra-ui/core";

import { GetStaticProps } from "next";
import { Link } from "@/components";
import Markdown from "react-markdown";
import { NextSeo } from "next-seo";
import { contentRenderer } from "@/utils/renderers";

const cocUrl =
  "https://raw.githubusercontent.com/denoland-id/information/master/CODE_OF_CONDUCT.md";

interface COCPageProps {
  content: string;
}

export const getStaticProps: GetStaticProps<COCPageProps> = async () => {
  const content = await fetch(cocUrl).then((res) => res.text());

  return {
    props: {
      content,
    },
    unstable_revalidate: 60,
  };
};

const COCPage: React.FC<COCPageProps> = ({ content }) => (
  <Box maxW="4xl" mx="auto" p={8}>
    <NextSeo
      title="Code of Conduct"
      description="Deno Land Indonesia code of conduct"
    />

    <Stack spacing={8}>
      <Box>
        <Markdown source={content} renderers={contentRenderer} />
      </Box>

      <Divider />

      <Text textAlign="center">
        <Link href={cocUrl} i>
          View original source on GitHub / Lihat sumber asli di GitHub
        </Link>
      </Text>
    </Stack>
  </Box>
);

export default COCPage;
