setlocal enabledelayedexpansion
set "count=1"
for /f "delims=*" %%f in ('dir /b *.mp4') do (
    ren "%%f" !count!.mp4
    set /a count+=1
)

(
    set /a count-=1
    echo var videoCount = !count!;
) > count.js