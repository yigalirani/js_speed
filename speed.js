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
  return {v:run_counter++,left:build(depth-1),right:build(depth-1)}
}
function count2(node){
  if (node==null)
    return 0
  return 1+count(node.left)+count(node.right)
}
function measure(title,f){
  var start=Date.now()
  var ops=f()
  var end=Date.now()
  var diff=(end-start)/1000
  console.log(title,'elapsed',diff,'ops',ops,'meg_ops_persecs',ops/diff/1000000)
  print_mem()
}
function print_mem(){
  try{
    var used=process.memoryUsage().heapTotal
    console.log('used',used,'pernode',used/run_counter)
  }catch(e){
    //console.log(e)
  }
}
depth=24 //number is chosen to max out memory and force gc
measure('array',()=>{
  var root=build(depth)
  var ops=count(root)
  if (ops!=run_counter){
    console.log('missmatch')
  }
  return ops
})

run_counter=0
measure('dict',()=>{
  var root=build2(depth)
  ops=count2(root)
  return ops
})
