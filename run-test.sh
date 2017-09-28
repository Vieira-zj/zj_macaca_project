#!/bin/bash

target=""
# run mocha test
if [ $1 == "mo" ]; then
  target="test-mocha-default"
# run macaca single test case
elif [ $1 == "ma" ]; then
  target="test-desktop-chrome-single-custom"
# run all macaca test cases in specified folder
elif [ $1 == "all" ]; then
  target="test-desktop-chrome-all-custom"
else
  target="test-desktop-chrome-single-custom"
fi
echo "run target: "${target}
make ${target}


# SHELL SCRIPT SAMPELS
# #1, variable
# str="hello wrold"
# echo "the source string is "${str}
# echo "the string length is "${#str}
# echo "the 6th to last string is "${str:5}
# echo "the 6th to 8th string is "${str:5:2}


# #2, conditions, file test
# echo "Please input a filename: "
# read filename

# echo "by test\n"
# test -f $filename && echo "the file is ordinary file" || echo "the file is not ordinary file"
# test -d $filename && echo "the file is document folder" || echo "the file is not document folder"
# test -r $filename && echo "the file can read" || echo "the file can not read"
# test -w $filename && echo "the file can write" || echo "the file can not write"
# test -x $filename && echo "the file can executable" || echo "the file can not executable"

# echo "by []\n"
# [ -f $filename ] && echo "the file is ordinary file" || echo "the file is not ordinary file"
# [ -d $filename ] && echo "the file is document folder" || echo "the file is not document folder"
# [ -r $filename ] && echo "the file can read" || echo "the file can not read"
# [ -w $filename ] && echo "the file can write" || echo "the file can not write"
# [ -x $filename ] && echo "the file can executable" || echo "the file can not executable"


# #3, conditions, number test
# echo "Please input two numbers:"
# read num1
# read num2

# echo "num1 = "${num1}
# echo "num2 = "${num2}
# echo "by test\n"
# test $num1 -eq $num2 && echo "num1 == num2" || echo "num1 != num2"
# test $num1 -ne $num2 && echo "num1 != num2" || echo "num1 == num2"
# test $num1 -gt $num2 && echo "num1 > num2" || echo "num1 <= num2"
# test $num1 -lt $num2 && echo "num1 < num2" || echo "num1 >= num2"
# test $num1 -ge $num2 && echo "num1 >= num2" || echo "num1 < num2"
# test $num1 -le $num2 && echo "num1 <= num2" || echo "num1 > num2"


# #4, conditions, if
# echo "Please input a filename"
# read filename
# if [ -f $filename ];then
# echo "this file is a ordinary file."
# else
# echo "this file is not a ordinary file."
# fi


# #5, conditions, if
# echo "Please input your math grades"
# read grades

# if [ $grades -gt 100 ] || [ $grades -lt 0 ];then
# echo "Please input the number range in 0 - 100"
# fi

# if [ $grades -ge 90 ] && [ $grades -le 100 ];then
# echo "Your grade is excellent."
# elif [ $grades -ge 80 ] && [ $grades -le 89 ];then
# echo "Your grade is good."
# elif [ $grades -ge 70 ] && [ $grades -le 79 ];then
# echo "Your grade is middle."
# elif [ $grades -ge 60 ] && [ $grades -le 69 ];then
# echo "Your grade is passing."
# else
# echo "Your grade is badly."
# fi


# #6，loop, while
# echo "run file: "$0

# # 6-1
# i=$1
# i=${i:=3}  # set default value
# while test $i -gt 0
# do
# echo $i
# ((i--))
# done

# #6-2
# i=$1
# while ((i>0))
# do
# echo $i
# ((i--))
# done


# #7, loop, for in
# for i in `seq 2 8`
# do
# echo $i
# done

# echo 'node version: '`node -v`


# #8, expr
# a=1
# b="str"
# echo $((a>1?8:9))
# ((b!="a")) && echo "str not equal"


# #9, expr
# num=10
# total=0
# for ((i=0;i<=num;i++))
# do
# ((total+=i))
# done
# echo 'total: '${total}


# #10
# name='zheng jin'
# echo 'hello ${name}' # print string
# echo "hello ${name}" # print string with varibale


# #11, reg expr
# strlist='testcheck dabletest checktest'
# for str in $strlist
# do
#   # if [[ $str =~ test$ ]]
#   if [[ ! $str =~ check$ ]]
#   then
#     echo $str
#   fi
# done
