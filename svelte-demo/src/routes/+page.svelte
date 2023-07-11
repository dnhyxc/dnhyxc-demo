<script>
  const href = "http://43.143.27.249:9216";

  const website = "墨客";

  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<a {href} target="_blank">{website}</a>

<div>this is my first svelte demo {website}</div>

<span>Clicked {count}</span>

<button on:click={handleClick}>
  {count % 2 ? "time" : "times"}
</button>

<style>
  a {
    color: skyblue;
    font-family: "Comic Sans MS", cursive;
    font-size: 2em;
  }
</style>
