export const documentsQueryKeys = {
  list: (githubUsername = "") => ["documents", githubUsername],
  item: (id: string) => ["document", id],
};

export default documentsQueryKeys;
