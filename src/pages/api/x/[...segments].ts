import { fetchModuleMetadata, getContentType } from "@/utils/registry";

import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const redirect = () => {
    const headers = {
      Location: req.url.replace(/\/api/, ""),
    };
    return res.writeHead(308, headers).end();
  };

  const segments = req.query.segments as string[];
  if (segments.length === 1) {
    return redirect();
  }

  const { content, tree } = await fetchModuleMetadata({
    segments,
    isApi: true,
  });
  if (!tree) {
    return res.status(404).json({
      message: "directory or file not found",
    });
  }
  if (Array.isArray(tree) || !content) {
    return redirect();
  }

  if (!(req.headers.accept.indexOf("html") >= 0)) {
    res.setHeader("content-type", getContentType(tree.name));
  }
  res.send(content);
};

export default handler;
