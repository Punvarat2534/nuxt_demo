<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import mixin from '~/helpers/custom.js';


const state = reactive({
  isbn: '',
  title: '',
  author: '',
  year: '',
  publisher: '',
});

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.isbn) errors.push({ name: 'isbn', message: 'Required' })
  if (!state.title) errors.push({ name: 'title', message: 'Required' })
  if (!state.author) errors.push({ name: 'author', message: 'Required' })
  if (!state.year) errors.push({ name: 'year', message: 'Required' })
  if (!state.publisher) errors.push({ name: 'publisher', message: 'Required' })
  return errors
}

computed(() => {
  return data.value.map(item => item * 2);
});

onMounted(() => {
  alert(mixin.url_endpoint);
});

function  onSubmit(){

        var dataform = new FormData();
          dataform.append('isbn', this.state.isbn);
          dataform.append('title', this.state.title);
          dataform.append('author', this.state.author);
          dataform.append('year', this.state.year);
          dataform.append('publisher', this.state.publisher);
          
        const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        },
        };

        axios.post("http://127.0.0.1:5000/create", dataform , config).then(response => { 
              // console.log(response.data);
                if(response.data.success==true){
                    this.$router.push({path: '/book/success'});
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
  <UForm :validate="validate" :state="state" class="create-form max-w-sm mx-auto max-w-lg mx-auto" @submit="onSubmit();">
  
   <Field name="email" type="email" />
    <ErrorMessage name="email" />
  
  <div class="mb-2">
    <UFormField label="เลขหนังสือ" name="isbn">
      <UInput v-model="state.isbn" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="เลขหนังสือ" />
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
      <UInput v-model="state.year" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ปีที่พิมพ์" />
    </UFormField>
  </div>
<div class="mb-2">
    <UFormField label="ผู้จัดพิมพ์" name="publisher">
      <UInput v-model="state.publisher" type="text" size="xl" color="neutral" variant="outline" class="w-full" placeholder="ผู้จัดพิมพ์" />
    </UFormField>
  </div>
  <div class="mb-2" style="text-align:center;">
  <br><UButton size="xl"  type="submit">บันทึก</UButton>
  </div>
  </UForm>
</div>
</div>
</template>