/* 
这是一个多行注释
它跨越了多个行
真是够长的
*/
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