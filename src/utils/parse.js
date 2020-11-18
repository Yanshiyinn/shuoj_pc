// const MarkdownIt = require('markdown-it')
// const mk=require('markdown-it-katex')
const mk = require('@area403/markdown-it-mathjax')

export function parseMD(str){
  let md = require('markdown-it')()
  md.use(mk);
  // str=`# Math Rulez!\n\n$\\sqrt{3x-1}+(1+x)^2$`
  // str=`$a\times b$`
  // str=`&emsp; 罗老师有一台神奇的复读机，你说什么它就会原封不动的重复一遍，作为集训队的灵魂领袖，他希望你写一个复读程序。\nLaTeX测试 $a \\times b$`
  let result = md.render(str);
  // console.log(typeof str)
  // console.log(typeof result)
  return result
}