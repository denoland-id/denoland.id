import * as React from "react";

import {
  Box,
  Heading,
  Icon,
  Input,
  PseudoBox,
  Stack,
  Text,
} from "@chakra-ui/core";
import { searchModuleFields, transformModuleFields } from "@/utils";
import { useDebounce, useSiteConfig } from "@/hooks";

import { DenoModule } from "@/types";
import { GetStaticProps } from "next";
import { Link } from "@/components";
import { NextSeo } from "next-seo";
import { getModulesTable } from "@/services/airtable";

interface XPageProps {
  data: DenoModule[];
}

export const getStaticProps: GetStaticProps<XPageProps> = async () => {
  const data = await getModulesTable()
    .select({ sort: [{ field: "name" }] })
    .all()
    .then((d) => d.map(({ fields }) => transformModuleFields(fields)));

  return {
    props: {
      data,
    },
    unstable_revalidate: 10,
  };
};

const XPage: React.FC<XPageProps> = ({ data }) => {
  const { socials } = useSiteConfig();

  const [search, setSearch] = React.useState<string>();
  const [debouncedSearch, update] = useDebounce(search);

  const filteredData = React.useMemo(
    () =>
      debouncedSearch
        ? data.filter((d) => searchModuleFields(d, debouncedSearch))
        : data,
    [debouncedSearch],
  );

  return (
    <Stack maxW="4xl" mx="auto" p={8} spacing={8}>
      <NextSeo
        title="Third Party Modules"
        description="Deno Land Indonesia third party modules"
      />

      <Stack spacing={2}>
        <Heading as="h1">Third Party Modules</Heading>
        <Text>
          Berikut merupakan daftar modul Deno karya para developer Indonesia. 🇮🇩
        </Text>
        <Text>
          Untuk sementara, daftar berikut hanya mengarah ke repository modul
          melainkan layanan <em>URL rewriting</em> seperti{" "}
          <Link href="https://deno.land/x" isExternal i>
            deno.land/x
          </Link>
          . Anda dapat bantu kontribusi pengembangan layanan berikut pada{" "}
          <Link href={socials.github} isExternal i>
            repositori GitHub kami
          </Link>
          .
        </Text>

        {/*
        <Text>
          <b>denoland.id/x</b> merupakan layanan penulisan ulang URL untuk
          modul Deno mirip dengan{" "}
          <Link href="https://deno.land/x" isExternal i>
            deno.land/x
          </Link>
          .
        </Text>
        <Text>
          Format dasar URL adalah{" "}
          <Code>https://denoland.id/x/MODULE_NAME@BRANCH/SCRIPT.ts</Code>. Jika
          tidak menyertakan nama branch, URL akan menggunakan branch default
          pada modul, umumnya yaitu branch <Code>master</Code>.
        </Text>
        */}

        <Text>
          Untuk menambahkan modul baru, silakan{" "}
          <Link href="https://airtable.com/shreNZcwvO3tM19L1" isExternal i>
            mengisi form modul database
          </Link>
          .
        </Text>
      </Stack>

      <Box>
        <Input
          placeholder="Input nama modul dan tekan enter"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={({ key }) => key === "Enter" && update()}
        />
      </Box>

      <Box
        borderColor="gray.200"
        borderRadius={4}
        borderWidth={1}
        boxShadow="md"
      >
        {filteredData.length > 0 ? (
          filteredData.map(({ name, desc, repoUrl }) => (
            <PseudoBox
              key={name}
              _hover={{ backgroundColor: "gray.50" }}
              _first={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
              _last={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
              _notLast={{ borderBottomWidth: 1, borderBottomColor: "gray.200" }}
            >
              <Link
                display="flex"
                _hover={{ textDecoration: "none" }}
                href={repoUrl}
                isExternal
                justifyContent="space-between"
              >
                <Box px={4} py={2}>
                  <Text color="blue.500">{name}</Text>
                  <Text fontSize="sm">{desc}</Text>
                </Box>

                <Box color="gray.500" pr={6} py={4}>
                  <Icon name="chevron-right" />
                </Box>
              </Link>
            </PseudoBox>
          ))
        ) : (
          <Text textAlign="center" p={4}>
            Tidak menemukan modul... :(
          </Text>
        )}
      </Box>
    </Stack>
  );
};

export default XPage;
