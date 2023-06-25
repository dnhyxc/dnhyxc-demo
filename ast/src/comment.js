const fs = require("fs");
const nodePath = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

const createModifiedCodeLog = (data) => {
  fs.writeFileSync(
    nodePath.join(__dirname, "js/modifiedCode.js"),
    data,
    (err) => {
      if (err) {
        throw err;
      } else {
        console.log("写入成功");
      }
    }
  );
};

// 源代码字符串（包含注释）
const code = `
/**
 * 去外面除块级注释
 */
// 外面单行去除注释
function remove(a, b) {
  // 去除注释1
  // 去除注释2
  // 去除注释3
  /**
   * 去除块级注释
   */
  /*去除块级注释*/
  console.log(a, b); // log 注释
  return a + b; // 这也是一个注释
}
`;

// 将源代码解析为 AST 树
const ast = parser.parse(code);

// 删除注释的访问者
const visitor = {
  enter(path) {
    const { node } = path;
    // 删除注释
    if (node.leadingComments || node.trailingComments) {
      // if (node.leadingComments || node.trailingComments || node.innerComments) { // {/* react 注释 */}
      delete node.leadingComments;
      delete node.trailingComments;
    }
  },
};

// 遍历 AST 树并删除注释
traverse(ast, visitor);

// 将修改后的 AST 转换回源代码字符串
const { code: modifiedCode } = generator(ast);

createModifiedCodeLog(modifiedCode);
