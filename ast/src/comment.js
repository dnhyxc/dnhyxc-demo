const fs = require("fs");
const nodePath = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const types = require("@babel/types");

const createModifiedCodeLog = (data, path = "js/modifiedCode.js") => {
  fs.writeFileSync(nodePath.join(__dirname, path), data, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("写入成功");
    }
  });
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
    if (types.isFunctionDeclaration(node)) {
      const cloneNode = types.cloneNode(node);
      // 可以在这里对克隆的节点进行其他操作
      const { code: modifiedCode } = generator(cloneNode);
      createModifiedCodeLog(modifiedCode, "/js/clone.js");
    }
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

// 解析源代码为 AST
function parseSourceCode(sourceCode) {
  return parser.parse(sourceCode, {
    sourceType: "module",
  });
}

// 创建单行注释的 AST 节点
function createSingleLineComment(commentText) {
  return {
    type: "CommentLine",
    value: ` ${commentText}`,
    start: null,
    end: null,
    loc: null,
  };
}

// 创建多行注释的 AST 节点
function createMultiLineComment(commentText) {
  return {
    type: "CommentBlock",
    value: ` \n${commentText}\n`,
    start: null,
    end: null,
    loc: null,
  };
}

// 在指定的节点之前添加注释
function addCommentBeforeNode(node, comment) {
  node.leadingComments = node.leadingComments || [];
  node.leadingComments.push(comment);
}

// 将源代码转换回字符串
function generateCode(ast) {
  return generator(ast).code;
}

// 用于将源代码转换为 AST 的函数
function transformSourceCode(sourceCode, commentText, createType) {
  // 解析源代码为 AST
  const ast = parseSourceCode(sourceCode);
  // 在指定的节点之前添加单行注释
  const nodeToComment = ast; // 用于演示的示例节点
  // 创建注释的 AST 节点
  const comment =
    createType === "single"
      ? createSingleLineComment(commentText)
      : createMultiLineComment(commentText);

  console.log(comment, "comment");

  // 在指定的节点之前添加注释
  addCommentBeforeNode(nodeToComment, comment);

  // 将 AST 转换回代码字符串
  const transformedCode = generateCode(ast);
  console.log(transformedCode);
  createModifiedCodeLog(transformedCode, "/js/comment.js");
}

// 示例调用
// const commentText = "这是一个新加的单行注释";
// transformSourceCode(code, commentText, "single");

const multiCommenttext = "这是一个多行注释\n它跨越了多个行\n真是够长的";
transformSourceCode(code, multiCommenttext, "multi");
