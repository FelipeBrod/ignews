import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/client";

const colors = ["#eba417", "#0EFF99"];

export function SignInButton() {
  const [session] = useSession();
  const colorLoggedIn = session ? colors[1] : colors[0];

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color={colorLoggedIn} />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("git")}
    >
      <FaGithub color={colorLoggedIn} />
      Sing in with GitHub
    </button>
  );
}
