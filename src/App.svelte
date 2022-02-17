<script lang="ts">
  import { 
     Button,
   } from "@/index";
  import { Router, Route, navigate } from "svelte-routing";
  import Wrapper from "@lib/Wrapper.svelte";

  const componentsPaths = [
    "Button",
  ];

  let output: any;
  $: output;
</script>

<main>
  <Router>
    <section class="show-components">
      {#each componentsPaths as path}
        <Button
          primary
          label={path}
          on:click={() => {
            navigate(`/${path}`);
          }}
        />
      {/each}
    </section>
    <Route path="/Button">
      <Wrapper {output}>
        <Button primary />
      </Wrapper>
    </Route>
  </Router>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  section.show-components {
    padding: 2rem;
  }
</style>
