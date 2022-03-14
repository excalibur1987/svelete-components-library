<script lang="ts">
  import { sentenceCase } from "change-case";
  export let output: any = null;

  type TInput = "text" | "number" | "boolean" | "object" | "textarea";

  interface IOptions {
    [key: string]: TInput | string[];
  }

  export let options: IOptions = {};

  export let args: { [key: keyof IOptions]: any } = {};
  $: args;
  const handleChange = (
    option: keyof IOptions,
    e: Event & {
      currentTarget: EventTarget &
        (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
    }
  ) => {
    const input = e.currentTarget;
    options[option] === "object" && console.log(JSON.parse(input.value));
    args = {
      ...args,
      [option]:
        input.type === "checkbox"
          ? (input as HTMLInputElement).checked
          : options[option] === "object"
          ? JSON.parse(input.value)
          : input.value,
    };
  };

  const getInputType = (type) => (type === "boolean" ? "checkbox" : type);
</script>

<main class="components-wrapper">
  <section>
    {#each Object.keys(options) as option}
      <span
        ><label for={option}>{sentenceCase(option)}:</label>
        {#if options[option] === "object" || options[option] === "textarea"}
          <textarea
            id={option}
            cols="30"
            rows="5"
            on:change={(e) => handleChange(option, e)}
          />
        {:else if Array.isArray(options[option])}
          <select id={option} on:change={(e) => handleChange(option, e)}>
            <option value="">----Select Value----</option>
            {#each options[option] as opt}
              <option value={opt}>{opt}</option>
            {/each}
          </select>
        {:else}
          <input
            id={option}
            on:change={(e) => handleChange(option, e)}
            on:keyup={(e) => handleChange(option, e)}
            type={getInputType(options[option])}
          />
        {/if}
      </span>
    {/each}
  </section>
  <slot {args} />
  <pre class="output-viewer">{output && JSON.stringify(output, null, " ")}</pre>
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
      width: 80%;
      font-size: medium;
      padding: 3px;
    }
  }
</style>
