

function make_orig(fields){
  const ans={}
  for (const name of fields.split(' ')){
    const value=Math.random()
    ans[name]={name,value}
  }
  return ans
}


const objects=make_orig('The quick brown fox jumps over the lazy dog')
const values=Object.values(objects)
console.log(objects)
console.log(values)
function forof(){
  let ans=0
  for (const x of values)
    ans+=x.value
}
function forofvalues(){
  let ans=0
  for (const x of Object.values(objects))
    ans+=x.value
}
 
function measure(func,count){
  var start=Date.now()
  for (let i=0;i<count;i++)
    func()
  var end=Date.now()
  var time_diff=(end-start)/1000
  var meg_ops_persecs=count/time_diff/1000000
  return {start,count,end,time_diff,meg_ops_persecs}
  return {gc,start,ops,end,time_diff,meg_ops_persecs,run_counter,error,used_before,used_build,used_clear,used_diff,mem_leak,used_pernode}
}
function main(){
  const result={
    forof:measure(forof,100000000),
    forofvalues:measure(forofvalues,100000000)
  }
  console.log(result)
}
main()