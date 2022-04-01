<script>
  import { fly } from "svelte/transition";
  import { controller } from "./controller.js";
  import { songs } from "./songs.js";
  import ListItem from "./ListItem.svelte";
  import _ from "underscore";

  let search = "";
  let hitanalytics = false;
  let searchedsongs, showtype;

  function filter(attr) {
    $controller.filter = attr;

    searchedsongs = _.filter(songs, function(song) {
      if ($controller.filter == "audio") {
        showtype = true;
        return song.song_url || song.inst_url;
      } else {
        showtype = false;
        return song.collection == $controller.filter;
      }
    }); // end searchedsongs

    // access analytics ONLY if set to true
    if (hitanalytics) {
      // console.log("analytics!");

      analytics.track("Filter", {
        type: attr
      });

      hitanalytics = false;
    }
  }

  // $: When input (search) changes, searchedsongs should update
  // toLowerCase() used for case-insensitive search
  // replace(/[^\w\s]|_/g, "") to strip away punctuations
  $: {
    if (search) {
      showtype = true;
      searchedsongs = _.filter(songs, function(song) {
        return song.lyrics
          .toLowerCase()
          .replace(/[^\w\s]|_/g, "")
          .includes(search.toLowerCase());
      }); // end searchedsongs
    } else {
      filter($controller.filter);
    }
  }

  // should return searchedsongs with found songs
  // console.log(searchedsongs);
</script>

<div transition:fly="{{ x:-200 }}">

  <!-- search bar -->
  <div class="p-3 sticky top-0">
    <input type="text" bind:value={search} placeholder="Search all songs" 
  class="rounded-md px-4 py-1 w-full h-11 bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-50 
  focus:outline-none focus:ring-teal-500 focus:ring-2 drop-shadow-md dark:drop-shadow-lg">
  </div>

  <!-- filter buttons -->
  {#if !search}
  <div class="flex px-4 pt-2 pb-1 space-x-3 text-sm overflow-x-scroll">
    <!-- hymn -->
    <div class="flex h-11 items-center clickable space-x-1 px-3 py-2 border-2 border-transparent rounded-full
    {$controller.filter == 'hymn' ? 'bg-white dark:bg-slate-700 border-teal-500' : 'bg-slate-100 dark:bg-slate-700 hover:dark:bg-slate-600'}"
    on:click={() => {$controller.filter = 'hymn'; hitanalytics = true;}}>
      <div class="icon-sm"><img src="assets/icon-type-hymn.svg" alt=""></div><span>Hymn</span>
    </div>
    <!-- campfire -->
    <div class="flex h-11 items-center clickable space-x-1 px-3 py-2 border-2 border-transparent rounded-full
    {$controller.filter == 'campfire' ? 'bg-white dark:bg-slate-700 border-teal-500' : 'bg-slate-100 dark:bg-slate-700 hover:dark:bg-slate-600'}"
    on:click={() => {$controller.filter = 'campfire'; hitanalytics = true;}}>
      <div class="icon-sm"><img src="assets/icon-type-campfire.svg" alt=""></div><span>Campfire</span>
    </div>
    <!-- audio track -->
    <div class="flex h-11 items-center clickable space-x-1 px-3 py-2 border-2 border-transparent rounded-full
    {$controller.filter == 'audio' ? 'bg-white dark:bg-slate-700 border-teal-500' : 'bg-slate-100 dark:bg-slate-700 hover:dark:bg-slate-600'}"
    on:click={() => {$controller.filter = 'audio'; hitanalytics = true;}}>
      <div class="icon-sm"><img src="assets/icon-music-single.svg" alt=""></div><span>Audio Tracks</span>
    </div>
  </div>
  {/if}

  <!-- list of (filtered) songs -->
  <ul class="m-0 p-0">
  {#each searchedsongs as song}
    <ListItem name={song.title} songurl={song.song_url} insturl={song.inst_url} type={song.collection} showtype={showtype} />
  {/each}
  </ul>
</div>