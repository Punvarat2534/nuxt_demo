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
  ffile: '',
});

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.isbn) errors.push({ name: 'isbn', message: 'กรุณาระบุข้อมูล' })
  if (!state.title) errors.push({ name: 'title', message: 'กรุณาระบุข้อมูล' })
  if (!state.author) errors.push({ name: 'author', message: 'กรุณาระบุข้อมูล' })
  if (!state.year) errors.push({ name: 'year', message: 'กรุณาระบุข้อมูล' })
  if (!state.publisher) errors.push({ name: 'publisher', message: 'กรุณาระบุข้อมูล' })
  if (!state.files) errors.push({ name: 'files', message: 'กรุณาระบุข้อมูล' })
  return errors
}

computed(() => {
  //return data.value.map(item => item * 2);
});

onMounted(() => {
setstate();
});

async function setstate(){
  //state.url_endpoint = await p.url_endpoint();
  //state.tokens = await p.xcrfstokens();
 
}

function handleFileChange(event) {
  state.ffile = event.target.files[0];
}

function  onSubmit(){

  

        var dataform = new FormData();
        dataform.append('myfile', state.ffile);
        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        axios.post("http://127.0.0.1:5000/profile", dataform , config).then(response => { 
                console.log(response.data);
                //if(response.data.success==true){
                 //   window.location.href = '/book/success'
                //}
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
  <UForm enctype="multipart/form-data" :state="state" class="create-form max-w-sm mx-auto max-w-lg mx-auto" @submit="onSubmit">
  
  <div class="mb-2">
    <UFormField label="รูุปภาพหน้าปก" name="files">
      <UInput v-model="state.ffiles" name="myfile" type="file" size="xl" color="neutral" variant="outline" class="w-full" @change="handleFileChange"/>
    </UFormField>
  </div>
  <div class="mb-2" style="text-align:center;">
  <br><UButton size="xl"  type="submit" style="cursor:pointer;">บันทึก</UButton>
  </div>
  </UForm>
</div>
</div>
</template>