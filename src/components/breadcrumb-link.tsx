import * as React from "react";

import {
  BreadcrumbLink as ChakraBreadcrumbLink,
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

const BreadcrumbLink: React.FC<LinkProps> = ({
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
        <ChakraBreadcrumbLink {...mergedProps} />
      </NextLink>
    );
  }

  return <ChakraBreadcrumbLink href={href} {...mergedProps} />;
};

export default BreadcrumbLink;
