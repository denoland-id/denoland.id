import * as React from "react";

import { Box, IconProps } from "@chakra-ui/core";
import { FaBookOpen, FaFile, FaFolder } from "react-icons/fa";

import { IconType } from "react-icons/lib";
import { TreeFileType } from "@/types";

interface TreeIconProps extends IconProps {
  name: string;
  type: TreeFileType;
}

const TreeIcon: React.FC<TreeIconProps> = ({ name, type, ...props }) => {
  let TreeIcon: IconType;

  if (/\.md$/.test(name)) {
    TreeIcon = FaBookOpen;
  } else if (type === "tree" || type === "dir") {
    TreeIcon = FaFolder;
  } else {
    TreeIcon = FaFile;
  }

  return <Box as={TreeIcon} {...props} />;
};

export default TreeIcon;
