(module
  (import "env" "memory" (memory 1))
  (import "env" "log" (func $log (param i32 i32)))

  (data (i32.const 0) "Hello, World!")

  (func (export "main") (param $loopcount i32)
    (local $loop_protection i32) ;; loop protection counter

    (loop $loop 
      ;; loop protection
      (block $loop_protection
        local.get $loop_protection
        i32.const 1
        i32.add
        local.tee $loop_protection
        i32.const 1000
        i32.lt_u
        br_if $loop_protection
        unreachable
      )

      ;; $log(offset: $loopcount, length: 1)
      local.get $loopcount
      i32.const 1
      call $log

      ;; $loopcount += 1
      local.get $loopcount
      i32.const 1
      i32.add
      local.set $loopcount

      ;; if($loopcount < 11) continue else break;
      local.get $loopcount
      i32.const 13
      i32.lt_u
      br_if $loop

      br $loop ;; A BUG
    )
  )
)