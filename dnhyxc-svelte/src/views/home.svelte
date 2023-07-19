<script>
  import Nested from "../components/Nested.svelte";
  import Info from "../components/Info.svelte";

  let name = "world";
  let string = `this string contains some <strong>HTML!!!</strong>`;

  let count = 0;

  let computedCount = 0;

  let numbers = [1, 2, 3, 4];

  const pkg = {
    name: "svelte",
    version: 3,
    speed: "blazing",
    website: "https://svelte.dev",
    author: "dnhyxc",
  };

  // 类似与 Vue 的计算属性 computed + watch
  $: doubled = count * 2;

  $: if (count >= 10) {
    console.log(`count is dangerously high!`);
    computedCount = 10;
  }

  $: console.log(`the count is ${count}`);

  $: {
    console.log(`the count is ${count}`);
    console.log(`computedCount is ${computedCount}`);
  }

  $: sum = numbers.reduce((t, n) => t + n, 0);

  function handleClick() {
    count += 1;
  }

  function addNumber() {
    numbers = [...numbers, numbers.length + 1];
  }
</script>

<main>
  Hello {name.toUpperCase()}!
  <p>{@html string}</p>

  <p>Clicked {count}</p>
  <p>doubled count {doubled}</p>
  <p>computedCount {computedCount}</p>

  <p>{numbers.join(" + ")} = {sum}</p>

  <Nested answer="dnhyxc" />
  <Nested />

  <Info {...pkg} />

  <button on:click={handleClick}>
    {count % 2 ? "time" : "times"}
  </button>

  <button on:click={addNumber}> Add a number </button>
</main>
