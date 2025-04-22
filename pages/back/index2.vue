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
    padding:0.5em;
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
    
    <NuxtLink to="/book/create" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><font-awesome icon="plus-circle" style="font-size:12pt;cursor:pointer;" />เพิ่มเอกสารใหม่</NuxtLink>
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
        <th></th>
      </tr>
      <tr v-for="book in books" :key="book.isbn">
                    <td style="width:1%;">{{book.id}}</td>
                    <td style="width:4%;padding:0.2em;"><img v-bind:src="book.image_m" /></td>
                    <td style="width:5%;">{{book.isbn}}</td>
                    <td style="width:20%;">{{book.title}}</td>
                    <td style="width:10%;">{{book.author}}</td>
                    <td style="width:5%;">{{book.year}}</td>
                    <td style="width:10%;">{{book.publisher}}</td>
                    <td style="width:1%;">
                    <NuxtLink :to="`/book/${book.isbn}`" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1"><font-awesome icon="pencil" style="font-size:12pt;cursor:pointer;" /></NuxtLink>
                    </td>
                    <td style="width:1%;">
                    <UModal title="กรุณายืนยันการลบข้อมูล ?" :close="{ color: 'primary',variant: 'outline',class: 'rounded-full'}">
                    <UButton color="neutral" variant="subtle"><font-awesome icon="trash" title="ลบ" style="font-size:14pt;color:#999;cursor:pointer;"/></UButton>
                    <template #body style="text-align:center;">
                    <NuxtLink style="cursor:pointer;" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" v-on:click="deleted(book.isbn)">ยืนยัน</NuxtLink>
                    <NuxtLink style="cursor:pointer;" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">ยกเลิก</NuxtLink>
                    </template>
                    </UModal>
                    </td>
        </tr>
        </tbody>
    </table>

<div style="margin:0auto;position:relative;">
<center>
<br>
<b>Page <input type="text" v-model="pages"  v-on:change="all($event.target.value);" style="width:30px;text-align:center;border:1px solid #999;"> of {{rcordcnt}}</b>
<ul>
<li class="pagination" v-on:click="all(1)"><b><<</b></li>
<li class="pagination" v-on:click="all(this.pages-1)"><b><</b></li>
<li class="pagination" v-for="n in Pagination" :class="checkIfpageActive(n)" v-on:click="all(n)">{{ n }}</li>
<li class="pagination" v-on:click="all(this.pages+1)"><b>></b></li>
<li class="pagination" v-on:click="all(this.rcordcnt)"><b>>></b></li>
</ul>
<br>
</center>
</div>

</div>
</template>
<script>
import axios from 'axios';
import mixin from '~/helpers/custom2.js';

export default {
    mixins: [mixin],
    data() {
        return {
            books:[],
            pages:[],
            rcordcnt:[],
            no:[],
        };
    },mounted() {
       
       this.pages = 1;
       this.fnrcordcnt();
       this.all(1);
       this.no = this.page;

       if(this.pages!=10){
          this.no = this.pages*10;
       }else{
          this.no = this.pages;
       }

    },
    computed: {
      Pagination() {
        let arr = [];
        var start= this.pages-2;
        var end=  this.pages+2;

        if(this.pages<=this.rcordcnt){
          if(this.pages<=3){
            start=1;
            end=5;
          }else if(this.pages > (this.rcordcnt-3) && this.pages <= (this.rcordcnt)){
            start=this.rcordcnt-4;
            end=this.rcordcnt;
          }else{
            start=this.pages-2;
            end=parseInt(this.pages)+2;
          }
      
          for (var i = start; i <= end; i++)
            arr.push(i);
            return arr;
          }
      }
    },
    methods:{
      checkIfpageActive(p) {
        if (p === this.pages) {
          return 'active';
        }
      },
     async fnrcordcnt(){
           const result = await axios.get(this.url_endpoint+"/pagecount")
            .then(response => {	
              this.rcordcnt = parseInt(response.data);
              return response.data;          
            })
            .catch(error => {
              alert(error);
            });

            return result;
      },
      async all(pgs){
          
            const tokens = await this.xcrfstokens();
            const rcordcnt = await this.fnrcordcnt();
            const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+tokens
                },
            };
            
            if((pgs>0)&&(pgs<=rcordcnt)){    
              
            this.pages=pgs;
            axios.get(this.url_endpoint+"/all/"+pgs,config)
                .then(response => {	
                this.books = response.data.data;        
            }).catch(error => {
                alert(error);
            });

            }
      },
      deleted(isbn){
           axios.delete(this.url_endpoint+"/delete/"+isbn+"")
            .then(response => {	
              window.location.reload();           
            })
            .catch(error => {
              alert(error);
            });
      }
    },
};
</script>