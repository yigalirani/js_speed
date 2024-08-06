function make_orig(fields){
  const ans={}
  for (const name of fields.split(',')){
    ans[name]={value:name+'value'}
  }
  return ans
}
function collect_targets(targets) {
  return Object.fromEntries(
    Object.entries(targets).map(([name,{ value }]) => [name,value])
  );
}
function collect_targets_simple(targets){
  const ans={}
  for ( const [name,value] of Object.entries(targets)){
    ans[name]=value.value
  }
  return ans
}


const the_orig=make_orig('ctl,drag_info,effective_config,row_nums_width,effective_columns,columns_ex,colwidths_hash,colwidths,table_width,frozen_left,filtered_data,vdim,sorted_data,full_key,fn,render_data,titles,rows,frozen_rows,the_head,download,last_row,return_value')
const fetched=collect_targets(the_orig)
console.log(the_orig)
console.log(fetched)
function do_collect_targets(){
  collect_targets(the_orig)
}
function do_collect_targets_simple(){
  collect_targets_simple(the_orig)
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
const result={
  do_collect_targets:measure(do_collect_targets,100000),
  do_collect_targets_simple:measure(do_collect_targets_simple,100000)
}
console.log(result)