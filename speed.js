'use strict';
var run_counter=0;
function build(depth){
  if (depth==0)
    return null
  return [run_counter++,build(depth-1),build(depth-1),depth]
}
function count(node,depth){
  if (node==null)
    return 0
depth    
  return 1+count(node[1],depth-1)+count(node[2],depth-1)
}
function build_dict_with_closure(depth){
  if (depth==0)
    return null
  const v=run_counter++
  const left=build_dict_with_closure(depth-1)
  const right=build_dict_with_closure(depth-1)
  return {v,left,right,get depth(){return depth}}
}
function count_dict_with_closure(node,depth){
  if (node==null)
    return 0
  if (node.depth!=depth)
    console.log('depth missmatch',node.depth,depth)
  return 1+count_dict_with_closure(node.left,depth-1)+count_dict_with_closure(node.right,depth-1)
}
function build_dict(depth){
  if (depth==0)
    return null
  const v=run_counter++
  const left=build_dict(depth-1)
  const right=build_dict(depth-1)
  return {v,left,right,depth}
}
function build_dict_iterivelt(depth){
  if (depth==0)
    return null
  const v=run_counter++
  const left=build_dict_iterivelt(depth-1)
  const right=build_dict_iterivelt(depth-1)
  const ans={}
  ans.v=v 
  ans.left=left
  ans.right=right
  ans.depth=depth
  return ans
}
function count_dict(node,depth){
  if (node==null)
    return 0
  if (node.depth!=depth)
    console.log('depth missmatch',node.depth,depth)
  return 1+count_dict(node.left,depth-1)+count_dict(node.right,depth-1)
}

class Node{
  constructor(v,left,right,depth){
    this.v=v
    this.left=left
    this.right=right
    this.the_depth=depth
  }
  get depth(){
    return this.the_depth
  }
}
function build3(depth){
  if (depth==0)
    return null
  
  return new Node(run_counter++,build3(depth-1),build3(depth-1),depth)
}
function count3(node,depth){
  if (node==null)
    return 0
  if (node.depth!=depth)
    console.log('depth missmatch',node.depth,depth)
  return 1+count3(node.left,depth-1)+count3(node.right,depth-1)
}
function count3_inner_func(node,depth){
  if (node==null)
    return 0
  function test_depth(){
    if (node.depth!=depth)
      console.log('depth missmatch',node.depth,depth)
  }
  test_depth()      
  return 1+count3(node.left,depth-1)+count3(node.right,depth-1)
}
function diff_dict(a,b){
  var ans={}
  for (const key of Object.keys(a)){
    ans[key]=a[key]-b[key]
  }
  return ans
}
function call_gc(){
  if (global.gc)
    return global.gc()
  return 'gc not available'
}

function measure(build,count){
  var start=Date.now()
  run_counter=0
  var gc=call_gc()
  var used_before=process.memoryUsage()
  var root=build(depth)
  var used_build=process.memoryUsage()
  var ops=count(root,depth)
  root=null
  call_gc();
  var used_clear=process.memoryUsage()
  var used_diff=diff_dict(used_build,used_before)
  var mem_leak=diff_dict(used_clear,used_before)
  var end=Date.now()
  if (ops!=run_counter){
    var error='missmatch'
  }
  var time_diff=(end-start)/1000
  var meg_ops_persecs=ops/time_diff/1000000
 
  var used_pernode=used_diff.heapUsed/run_counter
  return {gc,start,ops,end,time_diff,meg_ops_persecs,run_counter,error,used_pernode}
  return {gc,start,ops,end,time_diff,meg_ops_persecs,run_counter,error,used_before,used_build,used_clear,used_diff,mem_leak,used_pernode}
}

var depth=24 //number is chosen to max out memory and force gc
var stats={
  array:measure(build,count),
  //dict_with_cloisre:measure(build_dict_with_closure,count_dict_with_closure),
  dict:measure(build_dict,count_dict),
  build_dict_iterivelt:measure(build_dict_iterivelt,count_dict),
  class:measure(build3,count3),
  class_inner_func:measure(build3,count3_inner_func)
}
console.log(JSON.stringify(stats,null,4))
