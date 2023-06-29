const fs = require("fs");
const nodePath = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  // 处理 ast type 类型为 FunctionDeclaration（函数）的节点
  FunctionDeclaration(path) {
    // 将函数名称由 n 改为 x
    path.node.id.name = "x";
  },
  // 处理 ast type 类型为 Identifier（变量声明）的节点
  Identifier(path) {
    // 将函数参数名称由 n 改为 x
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  },
});

const output = generator(ast, {}, code);

const createModifiedCodeLog = (data, path = "js/traverse.js") => {
  fs.writeFileSync(nodePath.join(__dirname, path), data, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("写入成功");
    }
  });
};

createModifiedCodeLog(output.code);
