<script lang="ts">
  export let output: any;
</script>

<main class="components-wrapper">
  <slot />
  <pre class="output-viewer">
    {output && JSON.stringify(output, null, "\t")}
  </pre>
</main>

<style lang="scss">
  main.components-wrapper {
    border: #24b7ca solid 3px;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    height: 50vh;
    .output-viewer {
      background-color: #868282cc;
      color: white;
      font-size: large;
      padding: 2rem;
    }
  }
</style>
