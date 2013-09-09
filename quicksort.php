<?php
/**
 *  冒泡排序
 */
function BubbleSort($arr){
   $len = count($arr);
   for($i=0;$i<$len-1;$i++){
       $noSwrap = true;
       for($j=0;$j<$len-1-$i;$j++){
          if($arr[$j] > $arr[$j+1]){
              $tmp = $arr[$j];
              $arr[$j] = $arr[$j+1];
              $arr[$j+1] = $tmp;
              $noSwap = false;
          }
       }
       if($noSwrap ) break;
   }
   
   return $arr;
}

/**
 *  基于冒泡排序的 一躺快速排序, 前后两方向冒泡。
 */
function QBubblesort($arr){
   $i = 0;
   $ct= count($arr)-1;
   
   for(;$i<$ct;$i++){
      for($j=$ct;$j>=$i;$j--){           
        if($arr[$j] <$arr[$i]){
           $tmp= $arr[$j];
           $arr[$j] = $arr[$i];
           $arr[$i] = $tmp;
           
        } 
      }
   }
   return $arr;   
}

/**
  *  快速排序
  *  基本思想， 在待排序序列中任意选出一个数作为基数，用这个基数将数组划分左右两个分区，
  *  使得左子分区数都不大于基础数，而右子区的数都不小于基准数， 称为完成第一次划分， 如果左子区
  *  或者右子区不为空，则对它进行同样的划分，直至为空为止。
  */
function QuickSort(&$arr){
    
    $args = func_get_args();
    
    $left   = $i = isset($args[1])? $args[1] :0;
    $right = $j = isset($args[2])? $args[2] :count($arr)-1;
    if($left >= $right){
       return;
    }
    $temp = $arr[$i];
    
    while($i != $j){
        //从左到右扫描，即由后向前开始搜索，查找第一个比基数小得数
        while(($arr[$j] >= $temp) && ($i<$j)){
           $j--;
        }
        //这时$arr[$j] 为第一个小于 $temp的值。 这时进行交换。
        
        if($i < $j){
            //交换找到的数和基数
            $arr[$i] = $arr[$j];
            $i++;
        }
        // 从i 开始向后搜索，即向前开始向后搜索，找到第一个大于基数的值，两者交换。
        while(($arr[$i] <= $temp) && ($i < $j)){
           $i++;
        }    
        if($i < $j){
           $arr[$j] = $arr[$i];
           $j--;
        }
    }
    $arr[$i] = $temp;
    $pos = $i;
    
    QuickSort($arr,$left,$i-1);
    QuickSort($arr,$i+1,$right);
}

$x = range(1,200);
shuffle($x);
echo "对200个整数进行排序 \n";
$begintime = microtime(true);
QuickSort($x);
echo '我的快速排序  '.(microtime(true) - $begintime)."\n";

$begintime = microtime(true);
sort($x);
echo 'PHP本身的排序  '.(microtime(true) - $begintime)."\n";
