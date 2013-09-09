<?php
/**
 *  ð������
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
 *  ����ð������� һ�ɿ�������, ǰ��������ð�ݡ�
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
  *  ��������
  *  ����˼�룬 �ڴ���������������ѡ��һ������Ϊ��������������������黮����������������
  *  ʹ�����ӷ������������ڻ�����������������������С�ڻ�׼���� ��Ϊ��ɵ�һ�λ��֣� ���������
  *  ������������Ϊ�գ����������ͬ���Ļ��֣�ֱ��Ϊ��Ϊֹ��
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
        //������ɨ�裬���ɺ���ǰ��ʼ���������ҵ�һ���Ȼ���С����
        while(($arr[$j] >= $temp) && ($i<$j)){
           $j--;
        }
        //��ʱ$arr[$j] Ϊ��һ��С�� $temp��ֵ�� ��ʱ���н�����
        
        if($i < $j){
            //�����ҵ������ͻ���
            $arr[$i] = $arr[$j];
            $i++;
        }
        // ��i ��ʼ�������������ǰ��ʼ����������ҵ���һ�����ڻ�����ֵ�����߽�����
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
echo "��200�������������� \n";
$begintime = microtime(true);
QuickSort($x);
echo '�ҵĿ�������  '.(microtime(true) - $begintime)."\n";

$begintime = microtime(true);
sort($x);
echo 'PHP���������  '.(microtime(true) - $begintime)."\n";
