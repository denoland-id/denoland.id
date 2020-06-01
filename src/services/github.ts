export const getGitHubHeaders = () => {
  const user = process.env.GITHUB_CLIENT_ID;
  const pass = process.env.GITHUB_CLIENT_SECRET;
  const creds = Buffer.from(`${user}:${pass}`).toString("base64");

  const headers = new Headers();
  headers.append("Authorization", `Basic ${creds}`);
  return headers;
};
