<?php

$list = array(
    '1'=>array('0','0'),
    'a'=>array('A','1'),
    'b'=>array('B','0'),
    'c'=>array('C','a'),
    'D'=>array('D','c'),

);

function cat_options($spec_cat_id, $arr) 
{ 
    static $cat_options = array(); 
    if (isset($cat_options[$spec_cat_id])) 
    { 
        return $cat_options[$spec_cat_id]; 
    } 
/* 
初始化关键参数: 
$level:当前子节点深度 
$last_cat_id:当前父节点ID 
$options:带有缩进级别的数组 
$cat_id_array:沿同一路径的父节点依次进驻 
$level_array:该节点的子节点深度,也是依次进驻 
 */ 
    if (!isset($cat_options[0])) 
    { 
        $level = $last_cat_id = 0; 
        $options = $cat_id_array = $level_array = array(); 
        while (!empty($arr))//如果还有待构造的节点则继续遍历 
        { 
            foreach ($arr AS $key => $value) 
            { 
                $cat_id = $value['cat_id']; 
                //一级分类结点 
                if ($level == 0 && $last_cat_id == 0) 
                { 
                    if ($value['parent_id'] > 0) 
                    { 
                        break; 
                    } 
                    $options[$cat_id] = $value; 
                    $options[$cat_id]['level'] = $level; 
                    $options[$cat_id]['id'] = $cat_id; 
                    $options[$cat_id]['name'] = $value['cat_name']; 
                    //遍历过了就不再遍历 
                    unset($arr[$key]); 
                    if ($value['has_children'] == 0) 
                    { 
                        continue; 
                    } 
                    $last_cat_id = $cat_id;//下层结点的父亲结点 
                    $cat_id_array = array($cat_id); 
                    $level_array[$last_cat_id] = ++$level; 
                    continue; 
                } 
                //当前结点的父亲结点ID等于它的上一级结点ID 
                if ($value['parent_id'] == $last_cat_id) 
                { 
                    $options[$cat_id] = $value; 
                    $options[$cat_id]['level'] = $level; 
                    $options[$cat_id]['id'] = $cat_id; 
                    $options[$cat_id]['name'] = $value['cat_name']; 
                    unset($arr[$key]);//遍历过了就不再遍历 
                    //如果当前结点有孩子则当前结点要进驻,但不再遍历;反之不进驻也不再遍历 
                    if ($value['has_children'] > 0) 
                    { 
                        if (end($cat_id_array) != $last_cat_id) 
                        { 
                            $cat_id_array[] = $last_cat_id; 
                        } 
                        $last_cat_id = $cat_id;//当现结点做为下一级结点的新的父亲结点 
                        $cat_id_array[] = $cat_id;//进驻 

                        $level_array[$last_cat_id] = ++$level;//当前结点的下一级结点深度 
                    } 

                } 
                elseif ($value['parent_id'] > $last_cat_id) 
                {//如果当前结点父亲深度大于目前父亲结点的深度则进行下一轮循环 
                    break; 
                } 
            }//endforeach 
            $count = count($cat_id_array); 
            if ($count > 1) 
            { 
                //取出最后进驻的父亲节点作为当前父亲节点 
                $last_cat_id = array_pop($cat_id_array); 
            } 
            elseif ($count == 1) 
            { 
                if ($last_cat_id != end($cat_id_array)) 
                { 
                    //进驻的父亲结点只有一个时并且没有作为当前父亲节点时把它取出 
                    $last_cat_id = end($cat_id_array); 
                } 
                else 
                { //否则最后取出的父亲结点一定是一级分类结点 
                    $level = 0; 
                    $last_cat_id = 0; 
                    $cat_id_array = array(); 
                    continue; 
                } 
            } 

            if ($last_cat_id && isset($level_array[$last_cat_id])) 
            { 
                //取出当前结点的深度 
                $level = $level_array[$last_cat_id]; 
            } 
            else 
            { 
                $level = 0; 
            } 
        }//end while,此时已完成非递归前序遍历构造树的工作,其中$options已保存了从根结点开始的所有结点带有分层性质的数组 
        $cat_options[0] = $options; 
    } 
    else 
    { 
        $options = $cat_options[0]; 
    } 
    //如果从0开始即取整个树则直接返回不再处理. 
    if (!$spec_cat_id) 
    { 
        return $options; 
    } 
    //否则开始从指定结点截取,以下比较简单我还是稍微说说吧,要说就说几个参数含义吧 
/* 
$spec_cat_id_level:截取结点的深度 
$spec_cat_id_array:最终返回的以该结点为根结点的一棵商品分类树 
最终返回的数组是这样排序的:按父亲结点大小,按直接父亲结点,按同一父亲结点这样的先根遍历,具个例子: 
一级结点有1,5 二级结点有2,6,7 三级结点有8,9,如果1的直接孩子是2,6而2的直接孩子是8,9;另外 
5的直接孩子是7那么最终的数组是这样排列的1->2->8->9->6->5->7 
 */ 
    else 
    { 
        if (empty($options[$spec_cat_id])) 
        { 
            return array(); 
        } 
        $spec_cat_id_level = $options[$spec_cat_id]['level']; 

        foreach ($options AS $key => $value) 
        { 
            if ($key != $spec_cat_id) 
            { 
                unset($options[$key]); 
            } 
            else 
            { 
                break; 
            } 
        } 
        $spec_cat_id_array = array(); 
        foreach ($options AS $key => $value) 
        { 
            if (($spec_cat_id_level == $value['level'] && $value['cat_id'] != $spec_cat_id) || 
                ($spec_cat_id_level > $value['level'])) 
            { 
                break; 
            } 
            else 
            { 
                $spec_cat_id_array[$key] = $value; 
            } 
        } 
        $cat_options[$spec_cat_id] = $spec_cat_id_array; 
        return $spec_cat_id_array; 
    } 
}

?>
