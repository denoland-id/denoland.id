import * as React from "react";

import {
  Box,
  BoxProps,
  Code,
  Divider,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/core";

import { Link } from "@/components";

type RendererRecord = {
  [nodeType: string]: React.ElementType<any>;
};

// https://github.com/rexxars/react-markdown/issues/404#issuecomment-604019030
const slugifyChildren = (children: React.ReactNode) => {
  const flatten = (text: string, child: any) => {
    return typeof child === "string"
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text);
  };

  const arrayChildren = React.Children.toArray(children);
  const text = arrayChildren.reduce(flatten, "");
  const slug = text.toLowerCase().replace(/\W/g, "-");

  return slug;
};

export const contentRenderer: RendererRecord = {
  blockquote: (props) => (
    <Box
      borderLeftColor="gray.200"
      borderLeftWidth={2}
      color="gray.500"
      pl={4}
      py={2}
      {...props}
    />
  ),

  code: ({ language, value }) => (
    <Box overflow="auto" pb={2}>
      <Code p={2} w="full">
        <pre>{value}</pre>
      </Code>
    </Box>
  ),

  heading: ({ level, children, ...props }) => {
    const slug = slugifyChildren(children);

    const sizes = ["2xl", "xl", "lg", "md", "sm", "xs"];
    return (
      <Heading as={`h${level}`} id={slug} size={sizes[level - 1]} {...props}>
        <Link href={`#${slug}`}>{children}</Link>
        <Divider />
      </Heading>
    );
  },

  html: (props) => {
    const htmlProps: BoxProps = {
      dangerouslySetInnerHTML: { __html: props.value },
      pb: 4,
    };

    return <Box {...htmlProps} />;
  },

  inlineCode: (props) => <Box as="span" fontFamily="mono" {...props} />,

  link: (props) => <Link {...props} i />,

  list: (props) => (
    <List
      pl={8}
      py={2}
      spacing={2}
      stylePos="outside"
      styleType="disc"
      {...props}
    />
  ),

  listItem: (props) => <ListItem {...props} />,

  paragraph: (props) => <Text display="inline" {...props} />,

  root: (props) => <Stack spacing={4} {...props} />,

  table: (props) => (
    <Box overflow="auto">
      <Box as="table" {...props} />
    </Box>
  ),

  tableHead: (props) => <Box as="thead" fontWeight="bold" {...props} />,

  tableBody: (props) => <Box as="tbody" {...props} />,

  tableRow: (props) => <Box as="tr" {...props} />,

  tableCell: (props) => <Box as="td" borderWidth={1} p={2} {...props} />,

  thematicBreak: Divider,
};
