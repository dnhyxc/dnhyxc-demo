const fs = require("fs");
const nodePath = require("path");
const t = require("@babel/types");

const nodeList = {};

// 创建一个标识符节点。
nodeList.identifierNode = t.identifier("undefined");
// 等价于：nodeName

// 创建一个字符串字面量节点。
nodeList.stringLiteralNode = t.stringLiteral("Hello, World!");
// 等价于："Hello, World!"

// 创建一个数值字面量节点。
nodeList.numericLiteralNode = t.numericLiteral(902);
// 等价于：902

// 创建一个布尔字面量节点。
nodeList.booleanLiteralNode = t.booleanLiteral(true);
// 等价于：true

// 创建一个空字面量节点。
nodeList.nullLiteralNode = t.nullLiteral();
// 等价于：null

// 创建一个数组表达式节点。接受一个参数 elements（数组），表示数组的元素。元素可以是任何有效的 AST 节点，包括字面量、标识符、对象表达式等。
const elements = [
  t.stringLiteral("dnhyxc"),
  t.numericLiteral(18),
  t.booleanLiteral(true),
  t.objectExpression([
    t.objectProperty(t.identifier("name"), t.stringLiteral("dnhyxc")),
    t.objectProperty(t.identifier("age"), t.numericLiteral(18)),
  ]),
  t.identifier("y"),
  t.identifier("x"),
  t.identifier("c"),
];
nodeList.arrayExpressionNode = t.arrayExpression(elements);
// 等价于：["dnhyxc", 18, true, { name: "dnhyxc", age: 18, }, y, x, c];

// 创建一个数组模式节点。它接受一个参数 elements（数组），表示数组模式的元素。数组模式指定了在解构赋值或函数参数中如何匹配和处理数组的元素。只能接受通过 identifier 创建的节点
const patternElements = [
  t.identifier("y"),
  t.identifier("x"),
  t.identifier("c"),
];
nodeList.arrayPatternNode = t.arrayPattern(patternElements);
// 等价于：[y, x, c]

// 创建对象属性节点，接受 `key`、`value` 两个参数，分别表示属性的键和值。
const key = t.identifier("name");
const value = t.stringLiteral("dnhyxc");
nodeList.objectPropertyNode = t.objectProperty(key, value);
// 等价于：name: "dnhyxc"

// 创建一个对象表达式节点，接受一个参数 properties（数组），表示对象的属性。对象的属性可以是键值对，其中键通常是标识符或字符串字面量，值可以是任何有效的 AST 节点。
const properties = [
  t.objectProperty(t.identifier("name"), t.stringLiteral("dnhyxc")),
  t.objectProperty(t.identifier("age"), t.numericLiteral(18)),
];
nodeList.objectExpressionNode = t.objectExpression(properties);
/**
 * 等价于：
 * {
 *   name: "dnhyxc",
 *   age: 18
 * }
 */

// 创建一个函数表达式的节点。它包含了函数的标识符（如果有）、参数列表、函数体以及函数是否是异步的标志位。
const logStatement = t.expressionStatement(
  // 创建函数体内的 console.log 语句节点
  t.callExpression(
    t.memberExpression(t.identifier("console"), t.identifier("log")),
    [t.identifier("username")]
  )
);
// 创建函数体，包含 logStatement
const body = t.blockStatement([logStatement]);
// 创建函数表达式节点
nodeList.printUsernameFunction = t.functionExpression(
  t.identifier("myFunction"), // 函数标识符（函数名），如果想创建一个匿名函数，该参数可以传 null
  [t.identifier("username")], // 函数参数为 username
  body, // 函数体
  false // 不是异步函数
);
/**
 * 等价于：
 * var myFunction = function(username) {
 *   console.log(username);
 * };
 */

nodeList.printUsernameNoNameFunction = t.functionExpression(
  null, // 函数标识符（函数名），如果想创建一个匿名函数，该参数可以传 null
  [t.identifier("username")], // 函数参数为 username
  body, // 函数体
  false // 不是异步函数
);
/**
 * 等价于：
 * function(username) {
 *   console.log(username);
 * }
 */

// 创建函数的标识符节点
const functionId = t.identifier("myFunction");

// 创建函数的参数节点
const param = t.identifier("username");
const params = [param];

// 创建赋值表达式节点 const count = 2 + 9;
const left = t.identifier("count");
const right = t.binaryExpression("+", t.numericLiteral(2), t.numericLiteral(9));
const assignmentExpression = t.assignmentExpression("=", left, right);

// 创建 console.log(username); 的调用表达式节点
const mycallee = t.memberExpression(
  t.identifier("console"),
  t.identifier("log")
);
const argument = t.identifier("username");
const callExpression = t.callExpression(mycallee, [argument]);

// 创建返回语句节点 return count;
const returnStatement = t.returnStatement(t.identifier("count"));

// 创建函数体的表达式语句节点数组
const mybody = [
  t.expressionStatement(assignmentExpression),
  t.expressionStatement(callExpression),
  returnStatement,
];

// 创建函数体的语句块节点
const blockStatement = t.blockStatement(mybody);

// 创建函数表达式节点
nodeList.functionExpression = t.functionExpression(
  functionId,
  params,
  blockStatement
);
/**
 * 等价于：
 * function myFunction(username) {
 *   const count = 2 + 9;
 *   console.log(username);
 *   return count;
 * }
 */

/**
 * 创建一个表示函数调用表达式的节点类型。它包含了一个被调用的函数表达式和传递给该函数的参数列表。
 * 使用 CallExpression 节点，我们可以在抽象语法树（AST）中表示一个函数调用表达式。
 * 该节点的子节点是一个标识符或成员表达式，用于表示要调用的函数表达式，以及一个参数列表，用于表示传递给函数的参数。
 */
const callee = t.identifier("myFunction");
const argumentsList = [t.stringLiteral("count"), t.numericLiteral(12)];
nodeList.callExpressionNode = t.callExpression(callee, argumentsList);
// 等价于：myFunction("count", 12);

/**
 * 创建一个表示表达式语句的节点类型。它包含了一个表达式作为其子节点。
 * 在 JavaScript 中，表达式语句是指一个表达式后面跟着一个分号 ; 的语句。表达式语句会执行表达式的计算，并且不返回任何值或结果。
 * 使用 ExpressionStatement 节点，我们可以在抽象语法树（AST）中表示一个表达式语句。该节点的子节点就是要执行的表达式。
 */

const expression = t.callExpression(callee, argumentsList);
nodeList.expressionStatementNode = t.expressionStatement(expression);
// 上述代码等价于：myFunction("count", 12);

// 创建变量声明节点，它接受两个参数：kind：表示声明的类型，可以是 "var"、"let" 或 "const"。declarations：一个包含变量声明器的数组。
// 创建一个标识符节点，表示变量名
const identifierNode = t.identifier("myVariable");
// 创建一个字面量节点，表示变量的初始值
const valueNode = t.numericLiteral(29);
// 创建一个变量声明节点，并指定声明类型为 "var"，并包含一个变量声明器
const declarationVarNode = t.variableDeclaration("var", [
  t.variableDeclarator(identifierNode, valueNode),
]);
const declarationLetNode = t.variableDeclaration("let", [
  t.variableDeclarator(identifierNode, valueNode),
]);
const declarationConstNode = t.variableDeclaration("const", [
  t.variableDeclarator(identifierNode, valueNode),
]);
nodeList.declarationVarNode = declarationVarNode;
nodeList.declarationLetNode = declarationLetNode;
nodeList.declarationConstNode = declarationConstNode;

const createTypesLog = () => {
  fs.writeFileSync(
    nodePath.join(__dirname, "json/types.json"),
    JSON.stringify(nodeList),
    (err) => {
      if (err) {
        throw err;
      } else {
        console.log("写入成功");
      }
    }
  );
};

createTypesLog();
