### react-vnode-diff
1. jsx(react-jsx-plugin) -> vnode(createElement) -> DOM(render)

2. Component (render的第三种方式， react-jsx vnode.tag  function  Counter) -> 标签化的组件 ->Counter(extends) -> 变成Component类 -> render(jsx) -> reactDOM.render()

3. 响应式setState() 为了达到dom的更新，将整个DOM片段都替换掉了。
a. 新生成整个组件的dom树，重新挂载  100行dom的html
b. 只将setState关联的那一小段dom，在原来的dom的基础上做一下修改，将修改反映到dom上，1行
   结果 100:1  性能差距太大
   html树里面重绘  DOM开销是一般计算开销的100-1000倍   replaceChild
   重排 重新排列顺序
   重排和重绘都是性能开销极大的

4. React Dom Diff 算法
   需求： 减少dom操作
   setState 对应的DOM部分
   setState  返回一个新vnode ->将新的内存(虚拟)DOM,跟旧的dom对比(html片段)  联系: 树状结构,采用一个算法就可以你交出差异点，在相差的地方，进行真实的dom操作 