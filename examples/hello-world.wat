(module
  (import "env" "memory" (memory 1))
  (import "env" "log" (func $log (param i32 i32)))
  (import "env" "logMemory" (func $logMemory (param i32 i32)))
  (import "env" "count" (func $count (param i32 i32)))

  (data (i32.const 0) "Hello, World!")
  (data (i32.const 20) "loop")

  (func (export "main") (param $loopcount i32)
    i32.const 0
    i32.const 13
    call $log


    (loop $loop 
      ;; $logMemory(offset: $loopcount, length: 1)
      local.get $loopcount
      i32.const 1
      call $logMemory

      i32.const 20
      i32.const 4
      call $count

      ;; $loopcount += 1
      local.get $loopcount
      i32.const 1
      i32.add
      local.tee $loopcount

      ;; if($loopcount < 11) continue else break;
      i32.const 13
      i32.lt_u
      br_if $loop
    )
  )
)