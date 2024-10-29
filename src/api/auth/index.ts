import api from "..";

export const loginUser = async ({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) => {
  const res = await api.post("/login", { email, pass });
  return res;
};
