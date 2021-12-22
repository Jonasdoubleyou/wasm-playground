(module
  (import "env" "memory" (memory 1))
  (import "env" "log" (func $log (param i32 i32)))
  (import "env" "logMemory" (func $logMemory (param i32 i32)))
  (import "env" "count" (func $count (param i32 i32)))

  ;; data here

  (func (export "main") (param $loopcount i32)
    ;; main code here

    ;; log memory from [offset, offset + length) like this:
    ;; i32.const offset
    ;; i32.const length 
    ;; call $logMemory

    ;; log a message like this:
    ;; i32.const message offset
    ;; i32.const message length 
    ;; call $log

    ;; count by name
    ;; i32.const name offset
    ;; i32.const name length 
    ;; call $count
  )
)