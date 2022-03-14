<script lang="ts">
  import { MultiSelectGrouping, Button } from "@/index";
  import { Router, Route, navigate } from "svelte-routing";
  import Wrapper from "@lib/Wrapper.svelte";
  import { writable } from "svelte/store";

  const componentsPaths = ["MultiSelectGrouping", "Button"];

  const output = writable<any>(undefined);

  const args = writable<any>(undefined);
  const elmArgs = writable<any>(undefined);
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
      <Wrapper
        bind:args={$args}
        options={{
          primary: "boolean",
          backgroundColor: "text",
          size: ["small", "medium", "large"],
          label: "text",
        }}
        output={$output}
      >
        <Button {...$elmArgs} />
      </Wrapper>
    </Route>
    <Route path="/MultiSelectGrouping">
      <Wrapper bind:args={$args} output={$output}>
        <MultiSelectGrouping
          bind:selected={$output}
          options={{
            choices: [
              { data: "Data1", group: "Group 1", area: "Area 3" },
              { data: "Data2", group: "Group 1", area: "Area 3" },
              { data: "Data3", group: "Group 1", area: "Area 3" },
              { data: "Data4", group: "Group 1", area: "Area 3" },
              { data: "Data5", group: "Group 2", area: "Area 4" },
              { data: "Data6", group: "Group 2", area: "Area 4" },
              { data: "Data7", group: "Group 2", area: "Area 4" },
              { data: "Data8", group: "Group 2", area: "Area 4" },
            ],
            valueKey: "data",
            groupBy: "group",
            groupByKeys: ["group", "area"],
          }}
          maxShowCount={3}
        />
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
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
</style>
