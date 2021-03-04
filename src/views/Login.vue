<template style='overflow-y: hidden;'>
  <div id="app">
    <img
      alt="CPE logo"
      src="../assets/cmu-cpe-logo-side-by-side-mono.png"
    />
    <div id="mid">
      
      <br />
      <h1 class="header">Final Exam Schedule</h1>
      <br />
      <h5 class="explain">
        เว็ปนี้จัดทำขึนเพื่อตรวจสอบความคิดเห็นระหว่างตารางสอบใหม่และตารางสอบในปัจจุบัน
      </h5>
      <br /><br /><br />
      <a :href=link><button class="button-login">Login with CMU account</button> </a>
     
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
import qs from "qs";
export default {
  data(){
    return{
      link:"https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=TG48TWd9TqUgcSMSh5kKva4hepaSnEH45fQHueRu&redirect_uri=https://affectionate-roentgen-01a06a.netlify.app/timetable&scope=cmuitaccount.basicinfo"
    }
  }
};

</script>

<style scoped>
#app {
  background: linear-gradient(173deg, #28283d 80%, #ffffff 10%);
  height: 100vh;


}
.header {
  text-align: center;
  color: rgb(255, 255, 255);
  font-weight: 100%;
  font-size: 5vh;
}
.explain {
  text-align: center;
  color: white;
  /* font-weight: 500; */
  font-size: 2.5vh;
}

#mid {
  margin-top: 10%;
  height: 40vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* display: flex; */
  align-items: center;
  justify-content: center;
}

.button-login {
  border-radius: 12px;
  padding: 1.5% 2% 1.5% 2%;
  font-size: 2vh;
  background-color: #00ffc3;
  box-shadow: 3px 3px #555;

  color:#000;
}
button:hover {
  background-color: #00a59c;
}

button:active {
  background-color: #00a59c;
  box-shadow: 6px 6px #666;
  transform: translateY(4px);
}
img {
  max-width: 20vw ;
  height: auto;
  /* margin: 0px 0% 0% 20px */

}
</style>
