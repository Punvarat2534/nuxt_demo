<style>
.search-area:focus{
  border:0px solid #fff;
}

[contenteditable] {
  outline: 0px solid transparent;
}

.search-panel{
  margin:0 auto;width:550px;height:40px;padding:0.3em;border-radius:20px;text-align:center;border:1px solid #888;
}

.search-area{
  width:93%;float:left;height:35px;overflow:hidden;
}

.pagination {
    list-style: none;
    display: inline-block;
    margin:4px;
    cursor:pointer;
    border:1px solid gray;
    padding:0.4em;
}

.pagination:hover{
  background-color:#ddd;
}

.active{
  background-color:#0572d5;
  color:white;
}
</style>

<template>
<div class="container m-auto" style="margin-top:5px;margin-bottom:5px;background-color:white;padding:1em;">
<form method="post" action="">
  <div class="search-panel">
    <div id="search-area" class="search-area" contentEditable="true"></div>
    <div style="width:5%;float:left;"><button type="submit" style="border:0;padding:0;background-color:transparent;"><font-awesome icon="search" style="font-size:20pt;float:right;margin-right:10px;cursor:pointer;" title="search" /></button></div>
  </div>
  <input type="hidden" id="search-text" name="search-text"  placeholder="Search Here">
</form>
</div>

<div class="container m-auto" style="margin-top:5px;margin-bottom:5px;padding:5px;min-height:600px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;background-color:white;padding:20px;border-radius:5px;">
    <NuxtLink to="/book/create" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><font-awesome icon="plus-circle" style="font-size:12pt;cursor:pointer;" />&nbsp;เพิ่มเอกสารใหม่</NuxtLink>
    <br><br>
    <table class="tbl" style="width:100%;">
    <tbody>
    <tr> 
        <th></th>
        <th></th>
        <th>เลขหนังสือ</th>
        <th>ชื่อหนังสือ</th>
        <th>ผู้แต่ง</th>
        <th>ปีที่พิมพ์</th>
        <th>ผู้จัดพิมพ์</th>
        <th></th>
      </tr>
      <tr v-for="(book,index) in state.books" :key="book.isbn">
                    <td style="width:1%;">{{rcodno+index}}</td>
                    <td style="width:4%;padding:0.2em;"><img v-bind:src="book.image_m" /></td>
                    <td style="width:5%;">{{book.isbn}}</td>
                    <td style="width:20%;">{{book.title}}</td>
                    <td style="width:10%;">{{book.author}}</td>
                    <td style="width:5%;">{{book.year}}</td>
                    <td style="width:10%;">{{book.publisher}}</td>
                    <td style="width:1%;">
                    <NuxtLink :to="`/book/${book.isbn}`" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1"><font-awesome icon="pencil" style="font-size:12pt;cursor:pointer;" /></NuxtLink>
                    </td>
            
        </tr>
        </tbody>
    </table>

<center>
<br>

<b>Page <input type="text" v-model="state.pagestext"  v-on:change="all($event.target.value);" style="width:30px;text-align:center;border:1px solid #999;"> of {{state.rcordcnt}}</b>
<ul>
<li class="pagination" v-on:click="all(1)"><b><font-awesome icon="angle-double-left" style="font-size:12pt;cursor:pointer;" /></b></li>
<li class="pagination" v-on:click="all(state.pages-1)"><b><font-awesome icon="chevron-left" style="font-size:12pt;cursor:pointer;" /></b></li>
<li class="pagination" v-for="n in Pagination" :class="checkIfpageActive(n)" v-on:click="all(n)">{{ n }}</li>
<li class="pagination" v-on:click="all(state.pages+1)"><b><font-awesome icon="chevron-right" style="font-size:12pt;cursor:pointer;" /></b></li>
<li class="pagination" v-on:click="all(state.rcordcnt)"><b><font-awesome icon="angle-double-right" style="font-size:12pt;cursor:pointer;" /></b></li>
</ul>
<br>
</center>

</div>
</template>
<script setup lang="ts">

import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';
const p = useGlobal();

const state = reactive({
  url_endpoint:[],
  tokens:[],
  books:[],
  pages:[],
  rcordcnt:[],
  no:[],
  pagestext:[]
});

onMounted(() => {
    setstate();
    fnrcordcnt();
    all(1);
    state.pages = 1;
});

const rcodno = computed(() => {
  if(state.page==1){
      state.no = 0;
  }else{
      state.no = (parseInt(state.pages)-1)*10;
  }  
  
  let no = parseInt(state.no)+1;
  state.no = no;
  return no;
});

const Pagination = computed(() => {
  let arr = [];
        var start= state.pages-2;
        var end=  state.pages+2;
   
        if(state.pages<=state.rcordcnt){
          if(state.pages<=3){
            start=1;
            end=5;
          }else if(state.pages > (state.rcordcnt-3) && state.pages <= (state.rcordcnt)){
            start=state.rcordcnt-4;
            end=state.rcordcnt;
          }else{
            start=state.pages-2;
            end=parseInt(state.pages)+2;
          }

          for (var i = start; i <= end; i++)
            arr.push(i);
            return arr;
          }
});

  
async function setstate(){
    state.url_endpoint = await p.url_endpoint();
    state.tokens = await p.xcrfstokens();
}

function checkIfpageActive(p) {
    if ((p == state.pages)|| (p == state.pagestext)) {          
      return "active";
    }
}

async function fnrcordcnt(){
     var url_endpoint = await p.url_endpoint();
    const result = await axios.get(url_endpoint+"/pagecount")
            .then(response => {	
              state.rcordcnt = parseInt(response.data);
              return response.data;          
            })
            .catch(error => {
              alert(error);
            });

            return result;
}

async function all(pgs){

            const tokens = await p.xcrfstokens();
            const rcord = await fnrcordcnt();

            const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+tokens
                },
            };

            if((pgs>0)&&(pgs<=parseInt(state.rcordcnt))){    
              
              state.pages=pgs;
              state.pagestext = pgs;
              axios.get(state.url_endpoint+"/all/"+pgs,config)
                .then(response => {	
                state.books = response.data.data;        
              }).catch(error => {
                alert(error);
              });

            }
}



     
</script>