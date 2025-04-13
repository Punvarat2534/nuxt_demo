<script>

export default defineComponent({
  render () {
    return h('h1', 'Index page')
  }
})

</script>
<style>
  .search-area:focus{
   border:0px solid #fff;
  }

[contenteditable] {
  outline: 0px solid transparent;
}
</style>

<template>
<div class="container m-auto" style="padding:5px;">
<div style="background-color:white;padding:1em;">
<div style="margin:0 auto;">
<form method="post" action="">
  <div style="width:550px;height:40px;padding:0.3em;border-radius:20px;text-align:center;border:1px solid #888;text-align:center;">
    <div id="search-area" style="width:93%;float:left;height:35px;overflow:hidden;" contentEditable="true"></div>
    <div style="width:5%;float:left;"><button type="submit" style="border:0;padding:0;background-color:transparent;"><li style="font-size:20pt;float:right;margin-right:10px;cursor:pointer;" title="search" class="fa fa-search"></li></button></div>
  </div>

  <input type="hidden" id="search-text" name="search-text"  placeholder="Search Here">
</form>
  </div>
  </div>
</div>

<div class="container m-auto" style="padding:5px;min-height:550px;">
    <div class="row" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;background-color:white;padding:20px;border-radius:10px;">
    <table class="tbl" style="width:100%;">
    <tr> 
        <th></th>
        <th>เลขหนังสือ</th>
        <th>ชื่อหนังสือ</th>
        <th>ผู้แต่ง</th>
        <th>ปีที่พิมพ์</th>
        <th>ผู้จัดพิมพ์</th>
        <th></th>
    </tr>

</table>
    </div>
</div>
</template>