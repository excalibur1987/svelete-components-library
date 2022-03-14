<script lang="ts">
  import "./button.css";
  import { createEventDispatcher } from "svelte";
  /**
   * Is this the principal call to action on the page?
   */
  export let primary: boolean = false;

  /**
   * What background color to use
   */
  export let backgroundColor: string = null;
  $: backgroundColor;
  /**
   * How large should the button be?
   */
  export let size = "medium";
  /**
   * Button contents
   */
  export let label = "";

  let style: string;
  $: style = backgroundColor ? `background-color: ${backgroundColor}` : "";

  const dispatch = createEventDispatcher();

  /**
   * Optional click handler
   */
  function onClick(event) {
    dispatch("click", event);
  }
</script>

<button
  type="button"
  class:button--primary={primary}
  class:button--secondary={!primary}
  class={["button", `button--${size}`].join(" ")}
  {style}
  on:click={onClick}
>
  {label}
</button>

<style lang="scss">
  .button {
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
  }
  .button--primary {
    color: white;
    background-color: #1ea7fd;
  }
  .button--secondary {
    color: #333;
    background-color: transparent;
    box-shadow: #00000026 0px 0px 0px 1px inset;
  }
  .button--small {
    font-size: 12px;
    padding: 10px 16px;
  }
  .button--medium {
    font-size: 14px;
    padding: 11px 20px;
  }
  .button--large {
    font-size: 16px;
    padding: 12px 24px;
  }
</style>
