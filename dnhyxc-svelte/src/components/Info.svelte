<script>
  export let name;
  export let version;
  export let speed;
  export let website;

  const author = $$props.author;
</script>

<p>
  The <code>{name}</code> package is {speed} fast. Download version {version} from
  <a href="https://www.npmjs.com/package/{name}">npm</a>
  and <a href={website}>learn more here</a>
</p>
<p>not export field: {author}</p>
