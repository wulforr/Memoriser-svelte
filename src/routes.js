import Home from "./routes/index.svelte";
import Learn from "./routes/learn.svelte";
import Profile from "./routes/profile.svelte";
import Auth from "./routes/auth.svelte";
export default {
  "/": Home,
  "/learn": Learn,
  "/profile": Profile,
  "/auth": Auth,
  "*": Home,
};
