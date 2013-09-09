{config_load file=test.conf section="setup"}
{config_load file=mytest.conf}
{include file="header.tpl" title=foo}

<PRE>

{* bold and title are read from the config file *}
{if #bold#}<b>{/if}
{* capitalize the first letters of each word of the title *}
Title: {#title#|capitalize}
{if #bold#}</b>{/if}

<SELECT name=company>
{html_options values=$vals selected=$selected output=$output}
</SELECT>

{* 测试变量混算 *}
1 + 2 = ? ({"`$num1+$num2`"})

{* 返回现时处理中模块名称 *}
{$smarty.template}

{* 测试config_load *}
{#testsay#}

{* 测试smarty保留常量 *}
{$smarty.const.PATH}

{* 测试标量调节器,并调用截取函数 *}
{$long_str|truncate:20:"..."}

{* 测试默认值 *}
测试默认值myTitle {$myTitle|default:"no value"}

{* 测试编码函数 *}
{$smarty.const.LINK|escape:'html'}

{* 测试替换字符串替换/正则替换 *}
{$matchStr|replace:"my":"your"}
{$matchStr|regex_replace:"/[\r\t\n]/":" "}

{* 测试字符串计数器 *}
it's {$long_str|count_characters} chars by $long_str

{* 测试字符串连接符 *}
it's cat long_str & long_str2: {$long_str|cat:$long_str2}

{* 测试字符串内单词数量 *}
{$long_str2|count_words}

{* 测试smarty当前时间 调用保留变量 *}
The current date and time is {$smarty.now|date_format:"%Y-%m-%d %H:%M:%S"}

The value of global assigned variable $SCRIPT_NAME is {$SCRIPT_NAME}

Example of accessing server environment variable SERVER_NAME: {$smarty.server.SERVER_NAME}

The value of {ldelim}$Name{rdelim} is <b>{$Name}</b>

variable modifier example of {ldelim}$Name|upper{rdelim}

<b>{$Name|upper}</b>


An example of a section loop:{* 遍历关联数组 *}

{section name=outer loop=$FirstName}
{if $smarty.section.outer.index is odd by 2}
	{$smarty.section.outer.rownum} . {$FirstName[outer]} {$LastName[outer]}
{else}
	{$smarty.section.outer.rownum} * {$FirstName[outer]} {$LastName[outer]}
{/if}
{sectionelse}
	none
{/section}

An example of section looped key values:

{section name=sec1 loop=$contacts}
	phone: {$contacts[sec1].phone}<br>
	fax: {$contacts[sec1].fax}<br>
	cell: {$contacts[sec1].cell}<br>
{/section}

{foreach from=$index_arr item=curval}
	<br />{$curval}
{/foreach}
<p>

testing strip tags
{strip}
<table border=0>
	<tr>
		<td>
			<A HREF="{$SCRIPT_NAME}">
			<font color="red">This is a  test     </font>
			</A>
		</td>
	</tr>
</table>
{/strip}

</PRE>

This is an example of the html_select_date function:

<form>
{html_select_date start_year=1998 end_year=2010}
</form>

This is an example of the html_select_time function:

<form>
{html_select_time use_24_hours=false}
</form>

This is an example of the html_options function:

<form>
<select name=states>
{html_options values=$option_values selected=$option_selected output=$option_output}
</select>
</form>

{include file="footer.tpl"}
