<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';

const p = useGlobal();

const state = reactive({
  url_endpoint:[],
  tokens:'',
  err_isbn:'',
  err_title:'',
  err_author:'',
  err_year:'',
  err_publisher:'',
  books:[],
  isbn:[],
  image_m:'',
  ffile:[]
});

computed(() => {
  //return data.value.map(item => item * 2);
});

onMounted(() => {
  
  setstate();

  const route = useRoute()
  const isbn = route.params.isbn;
  state.isbn = isbn;
       
  showdata(isbn);
  console.log(state.url_endpoint);
});

function handleFileChange(event) {
  state.ffile = event.target.files[0];
}

async function setstate(){
  state.url_endpoint = await p.url_endpoint();
  state.tokens = await p.xcrfstokens();
  
}

async function showdata(isbn){

//alert(isbn);
       const tokens = await p.xcrfstokens();
       const url_endpoint = await p.url_endpoint();

       const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+tokens
            },
        };

            axios.get("http://localhost:5000/detail/"+isbn+"",config)
            .then(response => {	
              //console.log(response.data);
              
              state.books = response.data;
              state.isbn = state.books[0].isbn;
              state.title = state.books[0].title;
              state.author = state.books[0].author;
              state.year = state.books[0].year;
              state.publisher = state.books[0].publisher;
              state.image_m = state.books[0].image_m;
            })
            .catch(error => {
              alert(error);
            });
}


function save_image(isbn){
        
          var dataform = new FormData();
          dataform.append('isbn',isbn);
          dataform.append('files', state.ffile);
  
         const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+state.tokens
            },
        };

        axios.post(state.url_endpoint+"/imgupdate", dataform , config).then(response => { 
                console.log(response.data);
                if(response.data.success==true){
                   window.location.reload();
                }
        }).catch((error) => {
                console.log("error : "+error);
        });
}


function save(ele){
       //lert(ele);

       //alert($("#"+ele).val);


        if($("#"+ele).val()==""){
           $("#err_"+ele).text("กรุณาระบุข้อมูล");
        }else{

        var dataform = {
          "fields":ele,
          "values":$("#"+ele).val(),
          "isbn":state.isbn
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+state.tokens
            }
        };

        axios.post(state.url_endpoint+"/update", dataform,config).then(response => { 
                //console.log(response.data);   
                if(response.data.success==true){    
                  window.location.reload();
                }
               }).catch((error) => {
                console.log("error : "+error);
        });
        }

}

function deleted(isbn){

            axios.delete(state.url_endpoint+"/delete/"+isbn+"")
            .then(response => {	
              //console.log(response.data);
              window.location.href = '/'         
            })
            .catch(error => {
              alert(error);
            });
}

     function showele(ele){
        $("#ele_"+ele).fadeIn();
        $("#txt_"+ele).fadeOut();
      }

      function hideele(ele){
        $("#ele_"+ele).fadeOut();
        $("#txt_"+ele).fadeIn();
      }

</script>
<style>
label{
  font-weight: bold;
  font-size:12pt;
}

.tbl_detail{
  width:100%;
}

.tbl_detail td,th{
  padding:1em;
}

.tbl_detail td:hover{
  background-color:#F0F8FF;
}
</style>
<template>
<div class="container m-auto" style="margin-top:5px;margin-bottom:5px;padding:1em;min-height:1000px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;background-color:white;padding:20px;border-radius:5px;">
  <div style="padding-top:10px;padding-bottom:50px;">
  <div class="md-6 lg-6 sm-12 xs-12" style="margin:0 auto;">
   
  <table class="tbl_detail" style="border:1px solid #003c71;">
   <tbody>
   <tr>
   <th style="width:25%;background-color:#003c71;color:white;">เลขหนังสือ</th>
   <td style="width:70%;background-color:#ddd;">
   <div id="txt_isbn"><b>{{state.isbn}}</b></div>
   </td>
   <td style="width:10%;background-color:#ddd;text-align:center;">
    <UModal  title="กรุณายืนยันการลบข้อมูล ?" :close="{ color: 'primary',variant: 'outline',class: 'rounded-full'}">
                    <UButton color="neutral" variant="subtle"><font-awesome icon="trash" title="ลบ" style="font-size:14pt;color:red;cursor:pointer;"/></UButton>
                    <template #body style="text-align:center;">
                    <NuxtLink style="cursor:pointer;" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" v-on:click="deleted(state.isbn)">ยืนยัน</NuxtLink>
                  
                    </template>
   </UModal>
   </td>
   </tr>
   <tr>
   <th>รูุปภาพหน้าปก</th>
   <td colspan="2">
   <div id="txt_image"><font-awesome icon="pencil" style="font-size:14pt;float:right;margin-right:10px;cursor:pointer;" title="edit" @click="showele('image');" /><img v-bind:src="state.image_m" style="width:190px;height:240px;" /></div>
   <div id="ele_image" style="display:none;">
     
    <UFormField name="image">
      <UInput id="image" name="ffile" v-model="state.ffile" @change="handleFileChange" type="file" size="xl" color="neutral" variant="outline" class="w-full" />
    </UFormField>
      
    <button @click="save_image(state.isbn);" class="pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">save</button>
    <button @click="hideele('image');" class="pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">cancel</button>
   </div>
   </td>
   </tr>
   <tr>
   <th>ชื่อหนังสือ</th>
   <td colspan="2">
   <div id="txt_title">{{state.title}} <font-awesome icon="pencil" style="font-size:14pt;float:right;margin-right:10px;cursor:pointer;" title="edit" @click="showele('title');" /></div>
   <div id="ele_title" style="display:none;">
     
    <UFormField name="title">
      <UInput id="title" name="title" v-model="state.title" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ชื่อหนังสือ" />
      <span id="err_title" style="color:red;margin:5px;"/>
    </UFormField>
      
    <button @click="save('title');" class="pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">save</button>
    <button @click="hideele('title');" class="pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">cancel</button>
   </div>
   </td>
   </tr>
   <tr>
   <th>ผู้แต่ง</th>
   <td colspan="2">
   <div id="txt_author">{{state.author}} <font-awesome icon="pencil" style="font-size:14pt;float:right;margin-right:10px;cursor:pointer;" title="edit" @click="showele('author');" /></div>
   <div id="ele_author" style="display:none;">
    <UFormField name="author">
    <UInput id="author" name="author" v-model="state.author" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="เลขหนังสือ" />
    <span id="err_author" style="color:red;margin:5px;"/>
    </UFormField>
     
    <button @click="save('author');" class="pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">save</button>
    <button @click="hideele('author');" class="pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">cancel</button>
   </div>
   </td>
   </tr>
    <tr>
   <th>ปีที่พิมพ์</th>
  <td colspan="2">
   <div id="txt_year">{{state.year}} <font-awesome icon="pencil" style="font-size:14pt;float:right;margin-right:10px;cursor:pointer;" title="edit" @click="showele('year');" /></div>
   <div id="ele_year" style="display:none;">    
    <UFormField name="year">
    <UInput id="year" name="year" v-model="state.year" type="number" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ปีที่พิมพ์" />
    <span id="err_year" style="color:red;margin:5px;"/>
    </UFormField>  
    <button @click="save('year');" class="pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">save</button>
    <button @click="hideele('year');" class="pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">cancel</button>
  </div>
   </td>
   </tr>
    <tr>
   <th>ผู้จัดพิมพ์</th>
   <td colspan="2">
   <div id="txt_publisher">{{state.publisher}} <font-awesome icon="pencil" style="font-size:14pt;float:right;margin-right:10px;cursor:pointer;" title="edit" @click="showele('publisher');" /></div>
   <div id="ele_publisher" style="display:none;">
    <UFormField name="publisher">
    <UInput id="publisher" name="publisher" v-model="state.publisher" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ผู้จัดพิมพ์" />
    <span id="err_publisher" style="color:red;margin:5px;"/>
    </UFormField>  
    <button @click="save('publisher');" class="pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">save</button>
    <button @click="hideele('publisher');" class="pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">cancel</button>
   </div>
   </td>
   </tr>
   </tbody>
   </table>
   <br><br><br>
  </div>

</div>
</div>
</template>