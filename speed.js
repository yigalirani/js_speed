'use strict';
var run_counter=0;
function build(depth){
  if (depth==0)
    return null
  return [run_counter++,build(depth-1),build(depth-1)]
}
function count(node){
  if (node==null)
    return 0
  return 1+count(node[1])+count(node[2])
}
function build2(depth){
  if (depth==0)
    return null
  return {v:run_counter++,left:build2(depth-1),right:build2(depth-1)}
}
function count2(node){
  if (node==null)
    return 0
  return 1+count2(node.left)+count2(node.right)
}
class Node{
  constructor(v,left,right){
    this.v=v
    this.left=left
    this.right=right
  }
}
function build3(depth){
  if (depth==0)
    return null
  
  return new Node(run_counter++,build3(depth-1),build3(depth-1))
}
function count3(node){
  if (node==null)
    return 0
  return 1+count3(node.left)+count3(node.right)
}

function measure(build,count){
  var start=Date.now()
  run_counter=0
  var used_before=process.memoryUsage().heapTotal
  var root=build(depth)
  var used_build=process.memoryUsage().heapTotal
  var ops=count(root)
  root=null
  var used_clear=process.memoryUsage().heapTotal
  var used_diff=used_clear-used_before
  var end=Date.now()
  if (ops!=run_counter){
    var error='missmatch'
  }
  var time_diff=(end-start)/1000
  var meg_ops_persecs=ops/time_diff/1000000
 
  var used_pernode=used_diff/run_counter
  return {start,ops,end,time_diff,meg_ops_persecs,run_counter,error,used_before,used_build,used_clear,used_diff,used_pernode}
}

var depth=24 //number is chosen to max out memory and force gc
var stats={
  array:measure(build,count),
  dict:measure(build2,count2),
  class:measure(build3,count3)
}
console.log(JSON.stringify(stats,null,4))
