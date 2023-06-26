const t = require("@babel/types");

// 创建一个初始的数组表达式
const arrayExpression = t.arrayExpression([
  t.stringLiteral("apple"),
  t.stringLiteral("banana"),
  t.stringLiteral("cherry"),
]);

console.log(arrayExpression);
// Output: { type: 'ArrayExpression', elements: [ ... ] }

// 更新数组表达式中的元素
const updatedElements = [...arrayExpression.elements, t.stringLiteral("date")];

const updatedArrayExpression = t.updateArrayExpression(
  arrayExpression,
  updatedElements
);

console.log(updatedArrayExpression);
