import Home from "./routes/index.svelte";
import Learn from "./routes/learn.svelte";
import Profile from "./routes/profile.svelte";

export default {
  "/": Home,
  "/learn": Learn,
  "/profile": Profile,
  "*": Home,
};
