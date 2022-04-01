// Controller: all logic for app goes here
// All writeable functions should go here (like set, reset, etc)

// Ref: https://svelte.dev/tutorial/custom-stores
// Future: using an OBJECT as a store (not just single var): https://svelte.dev/repl/43e3eade9ec840dab9ab3a5177aa0dfa?version=3.23.2

import { writable } from "svelte/store";

export const controller = writable({
    page: "search",
    filter: "hymn",
    song: "Abide With Me",
    url:
        "https://dl.dropbox.com/sh/v3hz3amw12fo8ym/AADjOQ6Nave2-mBkCd7PQym8a/DT%20Hymns/Abide%20With%20Me_Music.mp3?dl=0",
    playing: false,
    footer: {
        mobile: "74px",
        desktop: "50px"
    }
});

controller.play = function () {
    this.playing = true;
};
