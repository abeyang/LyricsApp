// This contains all the user's settings
// Ref: https://svelte.dev/repl/43e3eade9ec840dab9ab3a5177aa0dfa?version=3.23.2

import { writable } from "svelte/store";

export const settings = writable({
    darkmode: true,
    random: "random 1 2"
});
