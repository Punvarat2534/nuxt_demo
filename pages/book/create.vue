<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';

const p = useGlobal();

const state = reactive({
  isbn:'',
  title:'',
  author:'',
  year:'',
  publisher:'',
  url_endpoint:'',
  files:[],
  tokens:'',
  isbn_error:'',
  ffile:[]
});



const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.isbn) errors.push({ name: 'isbn', message: 'กรุณาระบุข้อมูล' })
  if (!state.title) errors.push({ name: 'title', message: 'กรุณาระบุข้อมูล' })
  if (!state.author) errors.push({ name: 'author', message: 'กรุณาระบุข้อมูล' })
  if (!state.year) errors.push({ name: 'year', message: 'กรุณาระบุข้อมูล' })
  if (!state.publisher) errors.push({ name: 'publisher', message: 'กรุณาระบุข้อมูล' })
  if (!state.files) errors.push({ name: 'imgfiles', message: 'กรุณาระบุข้อมูล' })
  return errors
}

computed(() => {
  //return data.value.map(item => item * 2);
});

onMounted(() => {
setstate();
});

async function setstate(){
  state.url_endpoint = await p.url_endpoint();
  state.tokens = await p.xcrfstokens();
}

function handleFileChange(event) {
  state.ffile = event.target.files[0];
}

function  onSubmit(){

        if(state.isbn_error==""){
          var dataform = new FormData();
          dataform.append('isbn', state.isbn);
          dataform.append('title', state.title);
          dataform.append('author', state.author);
          dataform.append('year', state.year);
          dataform.append('publisher', state.publisher);
          dataform.append('files', state.ffile);
  
         const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+state.tokens
            },
        };

        axios.post(state.url_endpoint+"/create", dataform , config).then(response => { 
                console.log(response.data);
                if(response.data.success==true){
                    window.location.href = '/book/success'
                }
        }).catch((error) => {
                console.log("error : "+error);
        });
     }
}

function isbn_available(isbn){
     const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                //"Authorization": "Bearer "+state.tokens
            },
        };
       
        axios.get(state.url_endpoint+"/isbn/"+isbn, config).then(response => { 
                console.log(response.data);
                if(response.data.success==false){
                    state.isbn_error = response.data.msg;
                }else{
                    state.isbn_error = "";
                }
        }).catch((error) => {
                console.log("error : "+error);
        });
}

</script>
<style>
label{
  font-weight: bold;
  font-size:12pt;
}
</style>
<template>
<div class="container m-auto" style="margin-top:5px;margin-bottom:5px;padding:1em;min-height:600px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;background-color:white;padding:20px;border-radius:5px;">
  <div style="padding-top:50px;padding-bottom:50px;">
  <UForm  enctype="multipart/form-data" :validate="validate" :state="state" class="create-form max-w-sm mx-auto max-w-lg mx-auto" @submit="onSubmit();">
  
  <div class="mb-2">
    <UFormField label="เลขหนังสือ" name="isbn">
      <UInput v-model="state.isbn" v-on:change="isbn_available($event.target.value);" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="เลขหนังสือ" />
      <span style="color:red;">{{state.isbn_error}}</span>
    </UFormField>
  </div>
  <div class="mb-2">
    <UFormField label="ชื่อหนังสือ" name="title">
      <UInput v-model="state.title" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ชื่อหนังสือ" />
    </UFormField>
  </div>
  <div class="mb-2">
    <UFormField label="ผู้แต่ง" name="author">
      <UInput v-model="state.author" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ผู้แต่ง" />
    </UFormField>
  </div>
  <div class="mb-2">
    <UFormField label="ปีที่พิมพ์" name="year">
      <UInput v-model="state.year" type="number" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ปีที่พิมพ์" />
    </UFormField>
  </div>
<div class="mb-2">
    <UFormField label="ผู้จัดพิมพ์" name="publisher">
      <UInput v-model="state.publisher" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ผู้จัดพิมพ์" />
    </UFormField>
  </div>
  <div class="mb-2">
    <UFormField label="รูุปภาพหน้าปก" name="imgfiles">
      <UInput id="imgfiles" name="imgfiles" v-model="state.ffile" @change="handleFileChange" type="file" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ผู้จัดพิมพ์" />
    </UFormField>
  </div>
  <div class="mb-2" style="text-align:center;">
  <br><UButton size="xl"  type="submit" style="cursor:pointer;">บันทึก</UButton>
  </div>
  </UForm>
</div>
</div>
</template>