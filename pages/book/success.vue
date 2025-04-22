<style>

.tbl_detail{
  width:100%;
  margin:0 auto;
}

.tbl_detail th{
  padding:1em;
  text-align:left;
}

.pointer{
  cursor:pointer;
}
</style>

<template>
<div class="container m-auto" style="margin-top:5px;margin-bottom:5px;padding:5px;min-height:600px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;background-color:white;padding:20px;border-radius:5px;">
   <div class="text-align:center;margin:0 auto;">
       
       <center>
       <br><br><br><br>
        <font-awesome icon="check-circle" style="font-size:40pt;color:green;cursor:pointer;" /> <span style="font-size:25pt;"><b>เพิ่มข้อมูลสำเร็จ</b></span>
        <br><br><br>
        <NuxtLink to="/book/create" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><font-awesome icon="plus-circle" style="font-size:12pt;cursor:pointer;" />&nbsp;เพิ่มเอกสารใหม่</NuxtLink>
        <NuxtLink to="/" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><font-awesome icon="home" style="font-size:15pt;cursor:pointer;" />&nbsp;กลับหน้าแรก</NuxtLink>
        </center>    
   </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            books:[],isbn:[]
        };
    },mounted() {

    },
    computed: {
    },
    methods:{
      onSubmit(){
          var dataform = new FormData();
          dataform.append('isbn', this.isbn);
          dataform.append('title', this.title);
          dataform.append('author', this.author);
          dataform.append('year', this.year);
          dataform.append('publisher', this.publisher);
          
          //console.log(this.title);
          //console.log(dataform);

        const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        },
        };

        axios.post("http://127.0.0.1:5000/create", dataform , config).then(response => { 
                console.log("response: "+response.data);
                //window.location.reload();
        }).catch((error) => {
                console.log("error : "+error);
        });


      }
    },
};
</script>