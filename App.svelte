<script>
  import { fly } from "svelte/transition";
  import ListItem from "./ListItem.svelte";
  import Search from "./Search.svelte";
  import ControlPill from "./ControlPill.svelte";
  import Song from "./Song.svelte";
  import { songs } from "./songs.js";

  // controller will control what to show (song view vs list view)
  import { controller } from "./controller.js";
  import { settings } from "./settings.js";
</script>

<body class="p-0 m-0 {$settings.darkmode ? 'dark bg-slate-900' : ''}">
<section class="bg-slate-200 text-slate-900 dark:bg-slate-800/50 dark:text-slate-50 min-h-screen">
<main class="container mx-auto font-sans">

  
  {#if $controller.page == "search"}  
    <Search />
  {:else if $controller.page}
    <div class="px-6 pb-6">
      <Song />
    </div>
  {:else}
    <Search />
  {/if}
  <ControlPill />
</main>
</section>
</body>

<style>
  /* GLOBAL VARIABLES */
  :root {
    /* Misc */
    --footer: 74px;
  }

  /* PAGE SETTINGS.. */

  :global(.clickable) {
    cursor: pointer;
  }

  :global(.icon-sm) {
    width: 16px;
    height: 16px;
    display: flex;
    place-content: center;
  }

  :global(.icon-lg) {
    width: 24px;
    height: 24px;
    display: flex;
    place-content: center;
  }
</style>