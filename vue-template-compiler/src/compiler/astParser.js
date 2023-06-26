const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

function parseHtmIToAst(html) {
  let text;
  let root;
  let currentParent;
  let stack = [];

  while (html) {
    let textEnd = html.indexOf("<");

    // 判断起始位置是否是'<'
    if (textEnd === 0) {
      const startTagWatch = parseStartTag();

      if (startTagWatch) {
        start(startTagWatch.tagName, startTagWatch.attrs);
        continue;
      }

      const endTagMatch = html.match(endTag);

      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }

    // 判断'<'是否不在起始位置
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
      console.log(text, "text");
    }

    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  function parseStartTag() {
    // 匹配开始标签
    const start = html.match(startTagOpen);

    let end;
    let attr;

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);

      while (
        !(end = html.match(startTagClose)) &&
        // TODO
        (attr = html.match(attribute)[1])
      ) {
        // 如果没有匹配到结束标签，同时匹配到了标签属性则将属性push到属性列表中
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        // 将匹配完成的属性删除
        advance(attr[0].length);
      }

      // 如果找到了结束标签，则说明该起始标签已经处理完毕，则需要退出 while 循环，并返回处理好的match
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  function advance(n) {
    html = html.substring(n);
  }

  function start(tagName, attrs) {
    const element = createASTElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);
  }

  function end(tagName) {
    // 弹出栈中最后的一个元素
    const element = stack.pop();
    // 将目前栈中最末尾的元素取出（element 的前一个元素），作为当前的 currentParent
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      element.parent = currentParent;
      // 将栈中最后一个元素 element 作为 element 前面一个元素的子级元素
      currentParent.children.push(element);
    }
  }

  function chars(text) {
    text = text.trim();

    if (text.length > 0) {
      currentParent.children.push({
        type: 3,
        text,
      });
    }
  }

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent,
    };
  }

  return root;
}

export { parseHtmIToAst };
