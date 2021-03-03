<template>
  <div >
    
    <v-app-bar
        color="deep-purple accent-4"
        dark
      >
      <img src="../assets/cmu-cpe-logo-side-by-side-mono.png" >
      <v-spacer></v-spacer>
      <div style=" margin-right:2%;">{{std_id}}</div>
      <div>
        <b-button id="show-btn" @click="showModal">Logout</b-button>

          <b-modal ref="lodoutBoxRef" hide-footer title="Confirm Logout ">
            <h3>Do you want to logout.</h3>

          <router-link to='/'>      
            <b-button style="float:right; margin:1%;" @click="goOut" variant="outline-danger" >Logout</b-button>
          </router-link>
            <b-button style="float:right; margin:1%;" @click="hideModal" variant="outline-warning" >Cancel</b-button>

        </b-modal>
      </div>
    </v-app-bar>
    <div v-if='data.success'>
      <div class="columns">
        <div class="column is-half " style=" background-color: #888;  margin-bottom: 10px;">
          <br>
          <h1 style="text-align:center; font-size:175%;">ภาคการศึกษา {{data.data.sched_table[term_cout]['term']}}</h1>

          <div v-if='random_form >= 50'>
            <FinalTable :slot_course="data.data.reg_table[term_cout]" nameTable='แบบ A' />
          </div>
          <div v-if='random_form < 50'>
            <FinalTable :slot_course="data.data.sched_table[term_cout]" nameTable='แบบ A' />
          </div>
        </div>

        <div class="column"  style=" background-color: #aaa ; margin-bottom:10px;">
          <br>
          <h1 style="text-align:center; font-size:175%;">ภาคการศึกษา {{data.data.sched_table[term_cout]['term']}}</h1>

          <div v-if='random_form < 50'>
            <FinalTable :slot_course="data.data.reg_table[term_cout]" nameTable="แบบ B" />
          </div>
          <div v-if='random_form >= 50'>
            <FinalTable :slot_course="data.data.sched_table[term_cout]" nameTable="แบบ B" />
          </div>
        </div>
      </div>  
        <iframe :src="form1+form_std+std_id+form_term+data.data.sched_table[term_cout]['term']" v-if='random_form < 50'></iframe>
        <iframe :src="form2+form_std+std_id+form_term+data.data.sched_table[term_cout]['term']" v-if='random_form >= 50'></iframe>

      
 <div class="row justify-content-center" style="margin-top:20px">
          <ul class="progressbar"  v-for="i in data.data.sched_table.length" :key="i">
                        <li class='active' v-if='term_cout+1>=i'></li>
                        <li v-else> </li>
          </ul>
      </div>



        <div class="row justify-content-center"  style="margin-top:0" v-if='term_cout<data.data.sched_table.length-1 && data.data.sched_table.length != 1'>
          <div style="text-align:center; margin:auto 0 auto 0; font-size:2.5vh; color:red" >
            กรุณากดส่งฟอร์มก่อนไปหน้าถัดไป
          </div>
        </div>
          <div class="row justify-content-center">
            <b-btn style="float:right; margin:2%;" @click="plusterm"
             pill size="lg"
            >
            next {{data.data.sched_table[term_cout+1]['term']}} >>
            </b-btn>
          </div>
        <div style="text-align:center; margin:5; font-size:2.2vh; color:red" v-if='term_cout==data.data.sched_table.length-1' >
            <p>ขอบคุณที่ช่วยแสดงความคิดเห็น</p>
            จะสุ่มรายชื่อผู้โชคดีวันที่ 12 มีนา และแจ้งไปทางเมล์นะครับ
            <br>
             
          </div>

    </div>

    <div v-else class='load'> <ul class='loading'>
      
            <li>L</li>
            <li>O</li>
            <li>A</li>
            <li>D</li>
            <li>I</li>
            <li>N</li>
            <li>G</li>
        </ul>
    </div>
  </div>
</template>


<script>
import FinalTable from '@/components/FinalTable';

import axios from "axios";
import qs from "qs";
export default {
  name: 'Form',
  components: {
      FinalTable,
    },
  data(){
    return{ 
      term_cout:0,
      random_form:null,
      form_term:'&entry.94353861=',
      form_std:'&entry.1157249173=',
      form1 : "https://docs.google.com/forms/d/e/1FAIpQLSfv4s3Qhr_rEYK7__7SoNJ2Xrccis5nPrz36mnNstDrvt1SSg/viewform?usp=pp_url" ,
      form2 : "https://docs.google.com/forms/d/e/1FAIpQLScd6sHh0H_sf-c_vfb8r1zQFKR7QdJ14i7KhZm_Ci6Ik3yhYQ/viewform?usp=pp_url" ,
      data:Object,
      token :"",
      std_id:"",
 
      
    }
  },
 

  methods:{
    plusterm: function(term_cout){
      this.random_form = Math.random()*101;
      window.scrollTo(0, top);
      return (this.term_cout++)
    },
    showModal() {
        this.$refs['lodoutBoxRef'].show()
    },
    hideModal() {
        this.$refs['lodoutBoxRef'].hide()
      },
    goOut(){
      this.delete_token()

      this.$refs['lodoutBoxRef'].hide()
    },
    delete_token(){
      localStorage.removeItem('token')
      localStorage.term_cout = 0
      localStorage.removeItem('term_cout')

    },



  async load_token(){
    if (localStorage.token) {
      this.token = localStorage.token;
    }
 
    return this.token
  },
  async load_term(){
    if (localStorage.term_cout) {
        this.term_cout = Number(localStorage.term_cout);
    }
  },

  async get_token() {
  const code_auth = window.location.search.slice(1).split("=")[1];
  const data = qs.stringify({
    code: code_auth,
    redirect_uri: "http://localhost:8000/Timetable",
    client_id: "TG48TWd9TqUgcSMSh5kKva4hepaSnEH45fQHueRu",
    client_secret: "ua4sgC2d7h9BudXTNX3DWyXnTZm6ccycq1sufPaP",
    grant_type: "authorization_code",
  });
  const config = {
    method: "post",
    url: "https://oauth.cmu.ac.th/v1/GetToken.aspx/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  var response = await axios(config);
  this.token = response.data.access_token;
},
async get_id(){
  var config = {
    method: "get",
    url: "https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo",
    headers: {
      Authorization: "Bearer " + this.token,
    },
  }
 var response = await axios(config);
 this.std_id = response.data.student_id
},
async get_timetable() {
  var timetable = {}
  const config = {
    method: "get",
    url: "https://final-exam-web-eval.herokuapp.com/api/timetable/"+this.std_id

  };
  var response = await axios(config);
  timetable = response.data;
  this.data = timetable
}

  },
  async created(){

        this.load_term()
        const tk = await this.load_token()
        if (!tk){
        try{
          await this.get_token()
        } catch(err){
          if(err) {
            window.location.href = '/'
          }
        }
        }
        // 
        try{
          await this.get_id()
          
        } catch(err){
          if(err){
            this.delete_token()
            window.location.href = '/'
          }
        }
        await this.get_timetable()
        
        var random = Math.random()*101;
        this.random_form = random;
        
    },
    watch:{
      token(newToken){
        localStorage.token = newToken;
      },
      term_cout(newterm_cout){
        localStorage.term_cout = newterm_cout;
      }
    }
 
}


</script>





<style >
img {
  max-width: 20vw  ;
  max-height: auto;
}


.columns{
  border-style: none;
  width: 100vw;
  padding: 10px;

  margin-left: 0;
  margin-right:0;
  margin-top: 0;
  

}

iframe{
  width:99vw;
  height:1300px;

 }

/* @import url('https://fonts.googleapis.com/css2?fami ly=Rajdhani:wght@500&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
*{
    padding: 0;
    margin: 0;    
    font-family: 'kanit', sans-serif;  
}

.load ul{
    position: absolute;
    top: 50%;  left:50%;
    transform: translate(-50%,-50%);
}
.load ul li{
    display: inline-block;
    font-size: 6.5vw;
    letter-spacing: 3px;
    animation: anime 1.5s infinite linear;
}
@keyframes anime{
    0%{
        transform: translateY(0);
        letter-spacing: 3px;
        color: #808080;
        text-shadow: 1px 1px 0px #000;
    }
    50%{
        transform: translateY(-30px);
        letter-spacing: 15px;
        color: #ffc107; 
        text-shadow: 5px 10px 1px #000;
    }
    100%{
        transform: translateY(0);
        letter-spacing: 3px;
        color: #808080;
        text-shadow: 1px 1px 0px #000;
    }
}
ul li:nth-child(1){
    animation-delay: 0s;
}
ul li:nth-child(2){
    animation-delay: .1s;
}
ul li:nth-child(3){
    animation-delay: .2s;
}
ul li:nth-child(4){
    animation-delay: .3s;
}
ul li:nth-child(5){
    animation-delay: .4s;
}
ul li:nth-child(6){
    animation-delay: .5s;
}
ul li:nth-child(7){
    animation-delay: .6s;
}



.progressbar li{
  float: left;
  width: 3.28%;
  position: relative;
  text-align: center;
  margin: 3px;
}
.progressbar li:before{
  content:" ";
  width: 15px;
  height: 15px;
  border: 3px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: white;
  color: #bebebe;
  text-align: center;
  font-weight: bold;
}

.progressbar li.active:before{
 border-color: #3aac5d;
 background: #3aac5d;
 color: white
}

</style>
