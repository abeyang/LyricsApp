<script>
  import { controller } from "./controller.js";
  import { settings } from "./settings.js";

  let y,
    audio,
    duration,
    progress = 0,
    time = 0;

  // search and settings

  function changeMode() {
    $settings.darkmode = !$settings.darkmode;
    analytics.track("Settings", {
      darkmode: $controller.darkmode
    });
    // console.log("darkmode = " + $settings.darkmode);
  }

  function search() {
    $controller.page = "search";
    analytics.track("Search");
  }

  function gotoPage(page) {
    $controller.page = page;
    analytics.track("Page", {
      page: page,
      from: "Controll Pill"
    });
  }

  // audio player controls
  function play() {
    $controller.playing = true;
    analytics.track("Play", {
      song: $controller.song,
      from: "Controll Pill"
    });
  }

  function pause() {
    $controller.playing = false;
    analytics.track("Pause", {
      song: $controller.song,
      from: "Controll Pill"
    });
  }

  function updateTime() {
    // this.value has the value of the slider (out of 100 max)
    time = (progress / 100) * duration;
    // console.log("update!" + this.value);
  }

  $: {
    if (audio) {
      if ($controller.playing) {
        audio.play();
        progress = (time / duration) * 100;
      } else audio.pause();
    }
  }
</script>

<style>
  div.timelinex {
    width: 100%;
    height: 4px;
    padding: 0;
  }

  div.ui {
    height: 46px;
  }

  input.timeline {
    -webkit-appearance: none;
    width: calc(100%);
    height: 4px;
    border-radius: 0;
    background-image: linear-gradient(#14b8a6, #14b8a6);
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
    position: relative;
    top: -14px;
  }

  .timeline::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: all 0.1s;
    background-color: #14b8a6;
  }

  .timeline::-moz-range-thumb {
    -webkit-appearance: none;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: all 0.1s;
    background-color: #14b8a6;
  }

  .timeline::-ms-thumb {
    -webkit-appearance: none;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: all 0.1s;
    background-color: #14b8a6;
  }

  .timeline::-webkit-slider-thumb:hover {
    background-color: #5eead4;
  }

  .timeline:hover::-webkit-slider-thumb {
    opacity: 1;
  }

  .timeline::-moz-range-thumb:hover {
    background-color: #5eead4;
  }

  .timeline:hover::-moz-range-thumb {
    opacity: 1;
  }

  .timeline::-ms-thumb:hover {
    background-color: #5eead4;
  }

  .timeline:hover::-ms-thumb {
    opacity: 1;
  }

  .timeline::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  .timeline::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  .timeline::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
</style>

<svelte:window bind:scrollY={y}/>

<div class="fixed bottom-0 inset-x-0 h-[{$controller.footer.mobile}] md:h-[{$controller.footer.desktop}] bg-slate-200 dark:bg-slate-900">
  <!-- timeline -->
  <div class="timelinex">
    {#if duration}
    <input class="timeline bg-slate-300 dark:bg-slate-700" style="background-size: {progress}% 100%" type="range" min="0" max="100" on:input={updateTime} bind:value={progress}>
    <!-- <div class="bg-teal-500" style="height:2px; width:{progress}%"></div> -->
    {/if}
  </div>

  <div class="ui flex justify-between items-center container mx-auto">
    <div class="flex space-x-3 ml-2 items-center">
      {#if !$controller.playing}
      <!-- play button -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6 clickable" on:click={play} xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7781 10.7156L8.27813 2.47497C8.05326 2.33247 7.79356 2.25448 7.52738 2.24952C7.26121 2.24456 6.99878 2.31282 6.76876 2.44684C6.53533 2.57491 6.34074 2.76353 6.20545 2.99285C6.07017 3.22217 5.9992 3.48372 6.00001 3.74997V20.25C5.9992 20.5162 6.07017 20.7778 6.20545 21.0071C6.34074 21.2364 6.53533 21.425 6.76876 21.5531C6.99878 21.6871 7.26121 21.7554 7.52738 21.7504C7.79356 21.7455 8.05326 21.6675 8.27813 21.525L21.7781 13.2843C21.9994 13.1509 22.1824 12.9625 22.3095 12.7374C22.4365 12.5124 22.5033 12.2584 22.5033 12C22.5033 11.7416 22.4365 11.4875 22.3095 11.2625C22.1824 11.0375 21.9994 10.8491 21.7781 10.7156V10.7156Z"/>
      </svg>

      {/if}
      {#if $controller.playing}
      <!-- pause button -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6 clickable" on:click={pause} xmlns="http://www.w3.org/2000/svg">
        <path d="M19.9351 4.76392V19.7639C19.9351 20.1617 19.777 20.5433 19.4957 20.8246C19.2144 21.1059 18.8329 21.2639 18.4351 21.2639H15.0601C14.6622 21.2639 14.2807 21.1059 13.9994 20.8246C13.7181 20.5433 13.5601 20.1617 13.5601 19.7639V4.76392C13.5601 4.36609 13.7181 3.98456 13.9994 3.70326C14.2807 3.42195 14.6622 3.26392 15.0601 3.26392H18.4351C18.8329 3.26392 19.2144 3.42195 19.4957 3.70326C19.777 3.98456 19.9351 4.36609 19.9351 4.76392ZM8.31006 3.26392H4.93506C4.53723 3.26392 4.1557 3.42195 3.8744 3.70326C3.59309 3.98456 3.43506 4.36609 3.43506 4.76392V19.7639C3.43506 20.1617 3.59309 20.5433 3.8744 20.8246C4.1557 21.1059 4.53723 21.2639 4.93506 21.2639H8.31006C8.70788 21.2639 9.08941 21.1059 9.37072 20.8246C9.65202 20.5433 9.81006 20.1617 9.81006 19.7639V4.76392C9.81006 4.36609 9.65202 3.98456 9.37072 3.70326C9.08941 3.42195 8.70788 3.26392 8.31006 3.26392V3.26392Z" />
      </svg>

      {/if}
      <!-- song title -->
      <div class="w-48 md:w-auto clickable" on:click={gotoPage($controller.song)}><p class="text-sm truncate">{$controller.song}</p></div>

      <!-- audio track -->
      <audio bind:this={audio} bind:currentTime={time} bind:duration src="{$controller.url}" type="audio/mp3"><track kind="captions"/></audio>
      
    </div>
    
    <div class="flex space-x-3 mr-2">      
      {#if $settings.darkmode}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 clickable" on:click={changeMode} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 clickable" on:click={changeMode} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      {/if}
      
      {#if $controller.page == "search"}
      <!-- feedback button -->
      <a href="https://forms.gle/BVmb8h2AXfjAtfm86" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </a>
      {:else}
      <!-- search button -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 clickable" on:click={search} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {/if}
      
    </div>

  </div>
  

</div>