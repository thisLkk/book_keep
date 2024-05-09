<template>
  <div class="bill-details">
    <AddBillInfo @change="formChange"></AddBillInfo>
    <BillForm :monthResult="state.monthResult" @change="formChange"></BillForm>
    <List :dataSource="state.dataSource"></List>
  </div>
</template>

<script setup>
import axios from '@/utils/axios';
import { AXIOS_BOOK_KEEP } from '@/constant';
import { reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import BillForm from './components/BillForm.vue';
import List from './components/List.vue';
import AddBillInfo from './components/AddBillInfo.vue';
const route = useRoute();  
const state = reactive({  
  apiGetList: `${AXIOS_BOOK_KEEP}/get_list`,
  apiGetMonth: `${AXIOS_BOOK_KEEP}/get_month_data`,
  monthResult: {},
  dataSource: []
});

const getApiGetMonth = (date) => {
  if (!route.query.uid) {
    alert('uid不存在')
  }
  axios.get(state.apiGetMonth, {
    params:{
      uid: route.query.uid,
      date,
      cancelType: 1
    },
  })
  .then((response) => {
    const { code, data, msg } = response;
    if (code === 0) {
      state.monthResult = data;
    } else {
      alert(msg)
    }
  })
  .catch((err) => {
    console.log('#####err', err);
  });
}
const getApiGetList = (date) => {
  if (!route.query.uid) {
    alert('uid不存在')
  }
  axios.get(state.apiGetList, {
    params:{
      uid: route.query.uid,
      date,
      cancelType: 1
    },
  })
  .then((response) => {
    const { code, data, msg } = response;
    if (code === 0) {
      state.dataSource = data.reverse();
    } else {
      alert(msg)
    }
  })
  .catch((err) => {
    console.log('#####err', err);
  });
}
const formChange = ({ date }) => {
  if (date) {
    getApiGetMonth(date);
    getApiGetList(date);
  }
}

</script>

<style lang="less" scoped>
.bill-details {
  position: relative;
}
</style>
