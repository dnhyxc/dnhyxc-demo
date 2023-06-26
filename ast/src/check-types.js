const fs = require("fs");
const nodePath = require("path");
const t = require("@babel/types");

const nodeList = {};

const createTypesLog = () => {
  fs.writeFileSync(
    nodePath.join(__dirname, "json/check-types.json"),
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

// 检查一个节点是否为标识符节点
const node1 = t.identifier("myVariable");
const node2 = t.numericLiteral(42);

nodeList.node1 = t.isIdentifier(node1);
nodeList.node2 = t.isIdentifier(node2);

// 检查一个节点是否为字面量节点
const number = t.numericLiteral(29);
const identifier = t.identifier("dnhyxc");
const string = t.stringLiteral("Hello, World!");
const boolean = t.booleanLiteral(true);
const nnull = t.nullLiteral();
const binary = t.binaryExpression(
  "+",
  t.numericLiteral(2),
  t.numericLiteral(3)
);
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
const arrayExpressionNode = t.arrayExpression(elements);

nodeList.number = t.isLiteral(number);
nodeList.identifier = t.isLiteral(identifier);
nodeList.string = t.isLiteral(string);
nodeList.boolean = t.isLiteral(boolean);
nodeList.nnull = t.isLiteral(nnull);
nodeList.binary = t.isLiteral(binary);
nodeList.arrayExpressionNode = t.isLiteral(arrayExpressionNode);

// 检查一个节点是否为数字字面量节点
const isNumericLiteral = t.numericLiteral(29);
const notNumericLiteral = t.stringLiteral("29");

nodeList.isNumericLiteral = t.isNumericLiteral(isNumericLiteral);
nodeList.notNumericLiteral = t.isNumericLiteral(notNumericLiteral);

const isStringLiteral = t.stringLiteral("dnhyxc");
const isTplStringLiteral = t.stringLiteral(`dnhyxc`);
const notStringLiteral = t.numericLiteral(29);

nodeList.isStringLiteral = t.isStringLiteral(isStringLiteral); // true
nodeList.isTplStringLiteral = t.isStringLiteral(isTplStringLiteral); // true
nodeList.notStringLiteral = t.isStringLiteral(notStringLiteral); // false

const isArrayPattern = t.arrayPattern([t.identifier("a"), t.identifier("b")]);

nodeList.isArrayPattern = t.isArrayPattern(isArrayPattern); // true
nodeList.isArrayExpressionNode = t.isArrayPattern(arrayExpressionNode); // false

const isTrueBooleanLiteral = t.booleanLiteral(true);
const isFalseBooleanLiteral = t.booleanLiteral(false);

nodeList.isTrueBooleanLiteral = t.isBooleanLiteral(isTrueBooleanLiteral); // true
nodeList.isFalseBooleanLiteral = t.isBooleanLiteral(isFalseBooleanLiteral); // true

// 检查一个节点是否为对象表达式节点
const isObjectExpression = t.objectExpression([
  t.objectProperty(t.identifier("key1"), t.stringLiteral("value1")),
  t.objectProperty(t.identifier("key2"), t.stringLiteral("value2")),
]);
const notObjectExpression = t.identifier("dnhyxc");

nodeList.isObjectExpression = t.isObjectExpression(isObjectExpression); // true
nodeList.notObjectExpression = t.isObjectExpression(notObjectExpression); // false

// 检查一个节点是否为函数节点
const isFunctionDeclaration = t.functionDeclaration(
  t.identifier("add"),
  [t.identifier("a"), t.identifier("b")],
  t.blockStatement([
    t.returnStatement(
      t.binaryExpression("+", t.identifier("a"), t.identifier("b"))
    ),
  ])
);
const notFunctionDeclaration = t.identifier("x");

nodeList.notObjectExpression = t.isFunction(isFunctionDeclaration); // true
nodeList.notFunctionDeclaration = t.isFunction(notFunctionDeclaration); // false

createTypesLog();
