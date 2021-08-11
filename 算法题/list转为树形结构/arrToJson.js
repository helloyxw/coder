/**
 * 
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);

// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];
 */

// 方法一： 递归
/**
 * 
 * @param {*} list  
 * @param {*} parentId:  第一层节点的id
 * @returns 
 */
function makeTree(list, parentId) {
    return list
        .filter((node) => node.parentId === parentId)
        .reduce(
            (tree, node) => [
                ...tree,
                {
                    ...node,
                    children: makeTree(list, node.id)
                }
            ],
            []
        )
}

makeTree(list, 0)

// 方法二：
// 将list中的节点都以id为key挂载到map中， 遍历list，根据每个node
//的parentId找到父node，并插入到父node的children数组中。 再次遍历list
//找出parentId为0的node， 这些node就是第一层node

let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
function makeTree(list) {
    let map = new Map();
    let result = [];
    list.forEach(node => {
        map.set(node.id, node);
    });

    list.forEach(function(node, i) {
        let parent = map.get(node.parentId);
        if (!parent) {
            return
        }
        if(parent.hasOwnProperty('children')) {
            parent.children.push(node);
        } else {
            parent['children'] = [];
            parent.children.push(node);
        }
    });
    for(let i=0; i<list.length; i++) {
        let node = list[i];
        if (node.parentId === 0) {
            result.push(map.get(node.id))
        }
    }
    return result;
}
console.log(JSON.stringify(makeTree(list)));