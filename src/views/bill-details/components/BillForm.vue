<template>
    <div class="bill-form">
      <!-- <div class="header-tag">
        <div class="header-tag-label">记账标签</div>
        <div class="header-tag-values">
          <van-button
            class="header-tag-values_item"
            v-for="(item, key) in bookKeepTagData"
            :key="key"
            :type="item.id === state.tagSelectId ? 'primary': 'default'"
            size="mini"
            plain
            hairline
            @click="tagChange(item.id)"
          >
            {{ item.name }}
          </van-button>
        </div>
      </div> -->
      <div class="month-wrap">
        <div class="month-wrap-date" @click="state.showPicker = true">
          {{ state.currentDate[0] }}年{{ state.currentDate[1] }}月
          <van-icon name="arrow-down" />
        </div>
        <div v-if="monthResult" class="month-wrap-result">
          <div v-show="monthResult.income">总收入：{{monthResult.income / 100}}</div>
          <div v-show="monthResult.pay">总支出：{{monthResult.pay / 100}}</div>
        </div>
      </div>
      <van-popup v-model:show="state.showPicker" position="bottom">
        <van-date-picker
          v-model="state.currentDate"
          title="选择年月"
          :columns-type="['year', 'month']"
          @confirm="onDateConfirm"
          @cancel="state.showPicker = false"
        />
      </van-popup>
    </div>
  </template>
  
  <script setup>
  import { reactive, onBeforeMount, defineProps, defineEmits } from 'vue';
  import { Icon, Button, Popup, DatePicker } from 'vant';
  import { formatDate } from '../../../utils/handle';
  
  defineProps({
    monthResult: Object,
  });
  const emit = defineEmits(['change']);
  const state = reactive({  
    showPicker: false,
    currentDate: []
  });

  const onDateConfirm = ({ selectedValues }) => {
    state.currentDate = selectedValues;
    state.showPicker = false;
    emit('change', { date: selectedValues.join('-') });
  }
  onBeforeMount(() => {
    const currentData = formatDate(new Date().getTime(), 'yyyy-MM');
    state.currentDate = currentData.split('-');
    emit('change', { date: currentData });
  })
  
  </script>
  
  <style lang="less" scoped>
  .bill-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    padding: 0 48px;
    box-sizing: border-box;
    background: rgb(68, 196, 106);
    z-index: 101;
    .month-wrap {
      margin-top: 140px;
      display: flex;
      width: 100%;
      font-size: 28px;
      color: #fff;
      &-result {
        margin-left: 36px;
        display: flex;
        flex: 1;
        justify-content: flex-end;
        div {
          margin-left: 16px;
        }
      }
    }
  }
  </style>
  