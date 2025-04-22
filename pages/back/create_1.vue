<style>
.pointer{
  cursor:pointer;
}
</style>

<template>
<div class="container m-auto" style="margin-top:5px;margin-bottom:5px;padding:1em;min-height:600px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;background-color:white;padding:20px;border-radius:5px;">
   <div style="padding-top:50px;padding-bottom:50px;">
  <form :validation-schema="schema" class="create-form max-w-sm mx-auto max-w-lg mx-auto" @submit.prevent="onSubmit">

  <div class="mb-1">
    <label for="isbn" class="block mb-2 text-sm font-medium"><b>เลขหนังสือ</b></label>
    <input type="text" id="isbn" name="isbn" v-model="isbn" class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="เลขหนังสือ">
  </div>
  <div class="mb-1">
    <label for="isbn" class="block mb-2 text-sm font-medium"><b>ชื่อหนังสือ</b></label>
    <input type="text" id="title" name="title" v-model="title" class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="ชื่อหนังสือ">
  </div>
 <div class="mb-1">
    <label for="isbn" class="block mb-2 text-sm font-medium"><b>ผู้แต่ง</b></label>
    <input type="text" id="author" name="author" v-model="author" class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="ผู้แต่ง">
  </div>
  <div class="mb-1">
    <label for="isbn" class="block mb-2 text-sm font-medium"><b>ปีที่พิมพ์</b></label>
    <input type="text" id="year" name="year" v-model="year" class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="ปีที่พิมพ์">
  </div>
  <div class="mb-1">
    <label for="isbn" class="block mb-2 text-sm font-medium"><b>ผู้จัดพิมพ์</b></label>
    <input type="text" id="publisher" name="publisher" v-model="publisher" class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder="ผู้จัดพิมพ์">
  </div>
<div class="mb-1">
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input"><b>รูุปภาพหน้าปก</b></label>
  <input id="file_input" name="file_input" v-on:change="file_input"  type="file" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
  <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
</div>
<div class="mb-1" style="text-align:center;">
  <button class="pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">บันทึก</button>
</div>
</form>

  <form @submit.prevent="login">
    <label for="username">Username:</label>
    <input type="text" id="username" v-model="formData.username" required>
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="formData.password" required>
    <button type="submit">Login</button>
  </form>

</div>
</div>


</template>

<script>
import axios from 'axios';
import { required, email } from 'vuelidate'

export default {
    data() {
        return {
            books:[],isbn:[],
            
        };
    },
   validations: {
    formData: {
      email: {
        required,
        email,
      },
       password: {
        required
      }
    }
  },
    mounted() {

    },
    computed: {
    },
    methods:{
      onSubmit(){
        
        
        /*  var dataform = new FormData();
          dataform.append('isbn', this.isbn);
          dataform.append('title', this.title);
          dataform.append('author', this.author);
          dataform.append('year', this.year);
          dataform.append('publisher', this.publisher);
          
        const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        },
        };

        axios.post("http://127.0.0.1:5000/create", dataform , config).then(response => { 
                if(response.data.success==true){
                    this.$router.push({path: '/book/success'});
                }
        }).catch((error) => {
                console.log("error : "+error);
        });*/


      }
    },
};
</script>