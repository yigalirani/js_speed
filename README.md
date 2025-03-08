small experiment to compare speed of storing large trees of objects in memory.
retsults are
## node:
<pre>
array elapsed 1.03 ops 16777215 meg_ops_persecs 16.288558252427183
used 1245945856 pernode 74.26416458273916
dict elapsed 1.163 ops 16777215 meg_ops_persecs 14.425808254514187
used 1245159424 pernode 74.21728957994519
</pre>
## chrome browser

<pre>
array elapsed 1.652 ops 16777215 meg_ops_persecs 10.155699152542374
dict elapsed 0.729 ops 16777215 meg_ops_persecs 23.0140123456790
</pre>
## firefox browser
<pre>
array elapsed 1.972 ops 16777215 meg_ops_persecs 8.50771551724138 
dict elapsed 2.048 ops 16777215 meg_ops_persecs 8.19199951171875
</pre>
## objectvalues.js
<pre>
{
  forof: {
    start: 1741469544923,
    count: 100000000,
    end: 1741469545377,
    time_diff: 0.454,
    meg_ops_persecs: 220.26431718061673
  },
  forofvalues: {
    start: 1741469545377,
    count: 100000000,
    end: 1741469547677,
    time_diff: 2.3,
    meg_ops_persecs: 43.47826086956522
  }
}
</pre>