<script>
  import { fly } from "svelte/transition";
  import { controller } from "./controller.js";
  import { songs } from "./songs.js";
  import _ from "underscore";

  let thisname = $controller.page;
  let song;

  // in _.findWhere, "title" is from the songs key-value pair
  song = _.findWhere(songs, { title: thisname });

  function playsong(url, type) {
    $controller.song = thisname;
    $controller.url = url;
    $controller.playing = true;

    analytics.track("Play", {
      song: thisname,
      type: type,
      from: "Page"
    });
  }
</script>

<style>
</style>

<div class="py-8 mb-4 md:mb-8 text-base md:text-lg" transition:fly="{{ x:200 }}">
  <h4 class="text-3xl md:text-4xl font-bold tracking-tight mb-5 md:mb-8">{thisname}</h4>
  <p>{@html song.lyrics}</p>

  <!-- to-do: clean this section up -->
  {#if song.song_url || song.inst_url}
    <!-- FAB container -->
    <div class="fixed bottom-[{$controller.footer.mobile}] md:bottom-[{$controller.footer.desktop}] right-2 pb-3 flex flex-col space-y-3">
    
    {#if song.song_url}
      <button class="clickable rounded-full flex items-center justify-center h-14 w-14 drop-shadow-md dark:drop-shadow-lg 
      {$controller.url === song.song_url ? 'bg-white dark:bg-slate-700 border-2 border-teal-500' : 'bg-slate-50 dark:bg-slate-700 hover:dark:bg-slate-600'}" on:click={() => playsong(song.song_url, 'words')}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>
    {/if}
    {#if song.inst_url}
      <button class="clickable rounded-full flex items-center justify-center h-14 w-14 drop-shadow-md dark:drop-shadow-lg 
      {$controller.url === song.inst_url ? 'bg-white dark:bg-slate-700 border-2 border-teal-500' : 'bg-slate-50 dark:bg-slate-700 hover:dark:bg-slate-600'}" on:click={() => playsong(song.inst_url, 'inst')}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </button>
    {/if}
    
    </div> <!-- end .fab -->
  {/if}

  <footer class="py-8 my-8 md:py-12 md:my-12 border-t border-slate-300 dark:border-slate-700">
    
      <h6 class="text-xs tracking-widest text-slate-400 dark:text-slate-500 uppercase">Collection</h6>
      <p class="capitalize">{song.collection}</p>

      {#if song.author}
        <h6 class="pt-4 md:pt-6 text-xs tracking-widest text-slate-400 dark:text-slate-500 uppercase">Author</h6>
        <p>{song.author}</p>
      {/if}
      {#if song.ref}
        <h6 class="pt-4 md:pt-6 text-xs tracking-widest text-slate-400 dark:text-slate-500 uppercase">Reference</h6>
        <p>{song.ref}</p>
      {/if}
    
  </footer>
  
  
</div> <!-- end content -->

