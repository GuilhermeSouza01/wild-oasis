import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const getCurrentUser = async () => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error("Login error", { cause: sessionError });
  if (!session?.session) return null;

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error("Login error", { cause: userError });

  return user?.user;
};
