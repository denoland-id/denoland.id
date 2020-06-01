import * as React from "react";
import * as copee from "copee";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Select,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/core";
import { BreadcrumbLink, Link, TreeIcon, TreeItem } from "@/components";

import { FaArrowUp } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { RegistryResult } from "@/types";
import Router from "next/router";
import { fetchModule } from "@/utils/registry";
import { useForm } from "react-hook-form";

interface XPageProps {
  data: RegistryResult;
}

export const getServerSideProps: GetServerSideProps<XPageProps> = async ({
  params,
}) => {
  const segments = params.segments as string[];
  const data = await fetchModule({ segments });

  return {
    props: {
      data,
    },
  };
};

const XFilesPage: React.FC<XPageProps> = ({ data }) => {
  const { breadcrumbs, meta, path, segments } = data;

  const { register, handleSubmit } = useForm();
  const onChange = handleSubmit(({ branchtag }) => {
    Router.push("/x/[...segments]", `/x/${meta.name}@${branchtag}${path}`);
  });

  return (
    <Box maxW="5xl" mx="auto" p={8}>
      <NextSeo title={segments[0] || "404"} description={meta?.desc} />

      {meta ? (
        <Stack spacing={4}>
          <Flex direction={["column", , "row"]} justifyContent="space-between">
            <Box pb={[2, , 0]}>
              <Heading as="h1" size="lg">
                {segments[0]}
              </Heading>
              <Text>{meta.desc}</Text>
              <Link fontSize="sm" href={data.meta.repoUrl} isExternal i />
            </Box>

            <FormControl>
              <FormLabel fontSize="sm" htmlFor="branchtag">
                Select branch/tag:
              </FormLabel>
              <Select
                defaultValue={data.branchtag}
                fontSize="sm"
                id="branchtag"
                name="branchtag"
                onChange={onChange}
                ref={register}
              >
                {data.branchtags.map((ref) => (
                  <option key={ref} value={ref}>
                    {ref}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>

          <Box
            borderColor="gray.200"
            borderRadius={4}
            borderWidth={1}
            boxShadow="sm"
          >
            <Stack
              alignItems="center"
              backgroundColor="gray.50"
              borderBottomColor="gray.200"
              borderBottomWidth={1}
              borderTopLeftRadius={4}
              borderTopRightRadius={4}
              fontSize="sm"
              justifyContent="space-between"
              isInline
              p={2}
            >
              <Breadcrumb px={2} separator={<Icon name="chevron-right" />}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" isNextLink i>
                    denoland.id
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map(([b, href], i) => (
                  <BreadcrumbItem key={i}>
                    <BreadcrumbLink
                      href={i > 0 ? "/x/[...segments]" : "/x"}
                      isNextLink
                      linkAs={href}
                      i
                    >
                      {b}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>

              <Box flexGrow={1} />

              <Tooltip
                aria-label="Copy URL to clipboard"
                borderRadius={4}
                hasArrow
                label="Copy URL to clipboard"
                px={4}
                py={2}
              >
                <IconButton
                  aria-label="copy link"
                  icon="link"
                  onClick={() => copee.toClipboard(window.location.href)}
                  size="sm"
                />
              </Tooltip>
            </Stack>

            {Array.isArray(data.tree) ? (
              <Stack>
                {segments.length > 1 && (
                  <TreeItem
                    Icon={FaArrowUp}
                    name=".."
                    path={`/x/${segments
                      .slice(0, segments.length - 1)
                      .join("/")}`}
                  />
                )}
                {data.tree.map(({ name, type }, i) => (
                  <TreeItem
                    Icon={<TreeIcon color="gray.500" name={name} type={type} />}
                    key={i}
                    name={name}
                    path={`/x/${segments.join("/")}/${name}`}
                  />
                ))}
              </Stack>
            ) : (
              <Code
                backgroundColor="white"
                mb={-2}
                as="pre"
                overflow="auto"
                p={4}
                w="full"
              >
                {data.content}
              </Code>
            )}
          </Box>
        </Stack>
      ) : (
        <Stack spacing={4} textAlign="center">
          <Heading as="h1">404 Not Found</Heading>

          <Text>
            Modul <Code>{segments[0]}</Code> tidak dapat ditemukan atau belum
            diaktifkan... :(
          </Text>

          <Link href="/x" isNextLink i>
            Kembali ke denoland.id/x
          </Link>
        </Stack>
      )}
    </Box>
  );
};

export default XFilesPage;
