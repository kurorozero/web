<?php
$arr = array(
    array(
        'v'=>'1',
        'c'=>array(
            array(
                'v'=>'2',
                'c'=>array(
                    array(
                        'v'=>'3',
                        'c'=>array(
                            array(
                                'v'=>'4',
                                'c'=>array()
                            )
                        )
                    )
                )
            )
        )
    )
);

function loopit($arr){
	foreach($arr as $key=>$val){
		if(count($val['c'])>0){
			loopit(&$val['c']);
        }
        echo $val['v'].'<br />';
        $arr[$key]['v'] = 'aaaa';
	}
	return;
}

loopit(&$arr);
var_dump($arr);

?>
