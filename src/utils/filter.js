const format = (text) => {
  // if(!text)	return
  // text = encodeURI(text);
  let reg = new RegExp("\\\\n", "g"); //每个反斜杠都要被转义，换行是两个反斜杠，匹配就需要四个反斜杠
  return text.replace(reg, "\n       ");
};

// 数组截取
const limit = (array, length) => {
  // if(!array) 	return
  return array.slice(0, length);
};

export { format, limit };
