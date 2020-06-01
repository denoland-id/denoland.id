import * as React from "react";

import { Box, Stack, Text } from "@chakra-ui/core";

import { IconType } from "react-icons/lib";
import { Link } from "@/components";

interface TreeItemProps {
  Icon: IconType | JSX.Element;
  name: string;
  path: string;
}

const TreeItem: React.FC<TreeItemProps> = ({ Icon, name, path }) => {
  const fontWeight = /(README\.md|(index|mod)\.(js|ts))/.test(name)
    ? "semibold"
    : "normal";

  return (
    <Link
      _notLast={{ borderBottomColor: "gray.200", borderBottomWidth: 1 }}
      fontSize="sm"
      href="/x/[...segments]"
      isNextLink
      linkAs={path}
      i
    >
      <Stack alignItems="center" isInline px={4} py={1} spacing={4}>
        {React.isValidElement(Icon) ? (
          Icon
        ) : (
          <Box as={Icon as IconType} color="gray.500" />
        )}
        <Text fontWeight={fontWeight}>{name}</Text>
      </Stack>
    </Link>
  );
};

export default TreeItem;
