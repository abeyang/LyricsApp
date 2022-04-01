<script>
  import { controller } from "./controller.js";
  export let name, songurl, insturl, showtype, type;

  function jumptoPage(page) {
    $controller.page = page;
    analytics.track("Page", {
      page: page,
      from: "List"
    });
  }
</script>

<style>
</style>

<li class="py-2.5 px-4 list-none flex hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer"
on:click={jumptoPage(name)}>
  {#if showtype}
    <img src="assets/icon-type-{type}.svg" alt="" class="mr-2">
  {/if}
  <div class="content mr-auto">{name}</div>
  {#if songurl && insturl}
    <img alt="" src="./assets/icon-music-double.svg" />
  {:else if songurl || insturl}
    <img alt="" src="./assets/icon-music-single.svg" />
  {/if}
</li>