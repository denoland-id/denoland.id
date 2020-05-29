import * as React from "react";

import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/core";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

import { UrlObject } from "url";

type BaseLinkComponentProps = ChakraLinkProps;

interface LinkProps extends BaseLinkComponentProps {
  i?: boolean;
  isNextLink?: boolean;
  linkAs?: string | UrlObject;
  nextProps?: Omit<NextLinkProps, "as">;
}

const Link: React.FC<LinkProps> = ({
  href,
  isNextLink,
  linkAs,
  nextProps,
  children,
  ...props
}) => {
  const mergedProps: ChakraLinkProps = {
    ...props,
    color: props.i ? "blue.500" : props.color,
    children: children || href,
  };

  if (isNextLink) {
    return (
      <NextLink href={href} as={linkAs || href} passHref {...nextProps}>
        <ChakraLink {...mergedProps} />
      </NextLink>
    );
  }

  return <ChakraLink href={href} {...mergedProps} />;
};

export default Link;
