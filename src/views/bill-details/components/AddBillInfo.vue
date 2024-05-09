<template>
    <div class="add-bill">
      <div class="add-bill_entry" @click="state.showForm = true">
        <div class="add-bill_entry-icon">
          <van-icon name="edit" />
        </div>
        记一笔
      </div>
      <van-popup :show="state.showForm" position="bottom">
        <div class="add-bill_form">
          <div class="add-bill_form-close" @click="state.showForm = false">
            <van-icon name="cross" size="24px" />
          </div>
          <div class="add-bill_form-submit" @click="submit">提交表单</div>
          <div class="add-bill_form-label">
            <div
              v-for="item in BILL_LABEL_LIST"
              :key="item.id"
              :class="{ select: item.id === state.formData.record_type }"
              @click="formTypeChange(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="add-bill_form-date" @click="state.showPicker = true">
            {{ state.formData.date[1] }}-{{ state.formData.date[2] }}
            <van-icon name="arrow-down" />
          </div>
          <div class="add-bill_form-main">
            <div class="add-bill_form-main-title">
              <van-field v-model="state.formData.title" placeholder="标题" />
            </div>
            <div class="add-bill_form-main-money">
              <van-field v-model="state.formData.money" type="number" placeholder="金额" />
            </div>
          </div>
          <div class="add-bill_form-tag">
            <div
              v-for="item in BILL_TAG_LIST"
              :key="item.id"
              :class="{ select: item.id === state.formData.record_label }"
              @click="formLabelChange(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="add-bill_form-remark">
            <van-field v-model="state.formData.record_remark" label="备注"  label-align="top" />
          </div>
        </div>
      </van-popup>
      <van-popup :show="state.showPicker" position="bottom">
        <van-date-picker
          v-model="state.formData.date"
          title="选择年月"
          :columns-type="['year', 'month', 'day']"
          @confirm="onDateConfirm"
          @cancel="state.showPicker = false"
        />
      </van-popup>
    </div>
  </template>
  
  <script setup>
  import axios from '@/utils/axios';
  import { reactive, onBeforeMount, defineProps, defineEmits } from 'vue';
  import { Icon, Button, Popup, DatePicker, Field, showToast } from 'vant';
  import { formatDate } from '@/utils/handle';
  import { BILL_TAG_LIST, BILL_LABEL_LIST } from '@/constant';
  import { AXIOS_BOOK_KEEP } from '@/constant';
  import { useRoute } from 'vue-router';
  
  const emit = defineEmits(['change']);
  const route = useRoute();  
  const state = reactive({  
    showPicker: false,
    showForm: false,
    apiAddInfo: `${AXIOS_BOOK_KEEP}/add_info`,
    formData: {
      record_type: 1,
      date: [],
      title: '',
      money: '',
      record_label: 1,
      record_remark: ''
    }
  });

  const onDateConfirm = ({ selectedValues }) => {
    state.formData.date = selectedValues;
    state.showPicker = false;
  }

  const formTypeChange = (id) => {
    state.formData.record_type = id;
  }

  const formLabelChange = (id) => {
    state.formData.record_label = id;
  }

  const submit = () => {
    if (!state.formData.title) {
      alert('请输入标题' )
      return;
    }
    if (!state.formData.money) {
      alert('请输入金额')
      return;
    }
    const params = {
      uid: route.query.uid,
      ...state.formData
    }
    params.money = +params.money * 100;
    params.date = state.formData.date.join('-');
    axios.get(state.apiAddInfo, {
      params,
    })
    .then((response) => {
      const { code, data, msg } = response;
      if (code === 0) {
        // 月份不同不请求接口
        const currentDate = formatDate(new Date().getTime(), 'yyyy-MM')
        const formDate = state.formData.date.slice(0, 2).join('-');
        if (currentDate === formDate) {
          emit('change', { date: formDate });
        }
        state.showForm = false;
        state.formData = {
        record_type: 1,
        date: formatDate(new Date().getTime(), 'yyyy-MM-dd').split('-'),
        title: '',
        money: '',
        record_label: 1,
        record_remark: ''
      }
      } else {
        alert(msg)
      }
    })
    .catch((err) => {
      console.log('#####err', err);
    });
  }

  onBeforeMount(() => {
    const currentData = formatDate(new Date().getTime(), 'yyyy-MM-dd');
    state.formData.date = currentData.split('-');
  })
  
  </script>
  
  <style lang="less" scoped>
  .add-bill {
    &_entry {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 120px;
      height: 120px;
      padding-top: 50px;
      text-align: center;
      box-sizing: border-box;
      border-radius: 120px;
      border: 1px solid #f1f1f1;
      background: #ffffff7d;
      color: green;
      z-index: 101;
      &-icon {
        position: absolute;
        top: 12px;
        left: 44px;
      }
    }
    &_form {
      position: relative;
      padding: 24px;
      padding-bottom: 80px;
      &-submit {
        position: absolute;
        top: 24px;
        right: 24px;
        font-size: 32px;
        font-weight: 700;
        color: green;
      }
      &-label {
        margin-top: 24px;
        display: flex;
        color: #999;
        font-size: 28px;
        font-weight: 700;
        div {
          margin-right: 12px;
          border-radius: 12px;
          padding: 12px 30px;
          background: #f1f1f1;
          &.select {
            background: rgb(222, 241, 222);
            color: green;
          }
        }
      }
      &-date {
        position: absolute;
        top: 102px;
        right: 24px;
        border-radius: 12px;
        padding: 12px 30px;
        background: #f1f1f1;
      }
      &-main {
        margin-top: 40px;
        display: flex;
        position: relative;
        font-size: 40px;
        &-title {
          font-size: 40px;
          width: 240px;
        }
        &-money {
          position: relative;
          padding-left: 20px;
          &:after {
            content: '￥';
            position: absolute;
            left: 0;
            top: 8px;
          }
        }
      }
      &-tag {
        margin-top: 24px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        color: #999;
        font-size: 28px;
        font-weight: 700;
        div {
          flex-shrink: 0;
          margin-top: 12px;
          width: 96px;
          height: 96px;
          line-height: 96px;
          text-align: center;
          border-radius: 120px;
          background: #f1f1f1;
          &.select {
            background: rgb(222, 241, 222);
            color: green;
          }
        }
      }
      &-remark {
        margin-top: 48px;
        border: 1px solid #f1f1f1;
      }
    }    
  }
  </style>
  