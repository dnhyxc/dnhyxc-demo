const fs = require("fs");
const nodePath = require("path");
const parser = require("@babel/parser");
const generator = require("@babel/generator").default;

const sourceCode1 = `function add(a: number, b: number):number {
  // 这是一个行注释
  const message = 'Hello, world!'; /* 这是一个块注释 */
  console.log(a, b);
  console.log('dnhyxc', message);
  return a + b;
}`;

const sourceCode2 = "const name = 'dnhyxc'";

const astA = parser.parse(sourceCode1, {
  sourceFilename: "a.js",
  plugins: ["typescript"],
});
const astB = parser.parse(sourceCode2, { sourceFilename: "b.js" });

const ast = {
  type: "Program",
  body: [].concat(astA.program.body, astB.program.body),
};

const output = generator(
  ast,
  {
    minified: true, // 启用更进一步的代码压缩优化
    compact: true, // 以避免为格式化添加空格
    comments: false, // 删除所有注释
    sourceMaps: true, // 是否生成代码映射
  },
  {
    "a.js": sourceCode1,
    "b.js": sourceCode2,
  }
);

const createModifiedCodeLog = (data, path = "json/generator.json") => {
  fs.writeFileSync(nodePath.join(__dirname, path), data, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("写入成功");
    }
  });
};

createModifiedCodeLog(
  JSON.stringify({
    ast,
    output,
  })
);
