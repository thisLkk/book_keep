<template>
  <div class="list-wrap">
    <template v-if="dataSource.length">
      <div v-for="(item, index) in dataSource" :key="index">
        <div class="list-wrap-card">
          <div
            class="list-wrap-card_tag"
            :style="{ background: item.record_type === 1 ? 'green' : 'red'}"
          >
            {{ item.record_type === 1 ? '支出' : '收入' }}
          </div>
          <div class="list-wrap-card-header">
            {{ formatDate(item.created_date, 'yyyy-MM-dd') }}
            {{ getDayOfWeek(item.created_date) }}
          </div>
          <div class="list-wrap-card-content">
            <div
              class="list-wrap-card-content_label"
              :style="{background: getTag(item.record_label).color}"
            >
              {{ getTag(item.record_label).name }}
            </div>
            <div class="list-wrap-card-content_info">
              {{ item.title }}:
              {{ item.money / 100 }} 元
            </div>
            <div
              v-if="item.record_remark"
              class="list-wrap-card-content_remark"
            >
              {{ item.record_remark }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="list-wrap-no-data">暂无数据，快去添加吧~</div>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount, defineProps, defineEmits } from 'vue';
import { Icon, Button, Popup, DatePicker } from 'vant';
import { formatDate, getDayOfWeek } from '../../../utils/handle';

defineProps({
  dataSource: Array,
});

const tagList = [
  {
    id: 1,
    name: '吃喝',
    color: '#dcba39'
  },
  {
    id: 2,
    name: '玩乐',
    color: '#CDDC39'
  },
  {
    id: 3,
    name: '生活',
    color: '#c439dc'
  },
  {
    id: 4,
    name: '交通',
    color: '#1989fa'
  },
  {
    id: 5,
    name: '人情',
    color: '#ff976a'
  },
  {
    id: 99,
    name: '其他',
    color: '#673AB7'
  },
]

const getTag = (id) => {
  const item = tagList.find(item => item.id === id);
  return item || {}
}


</script>

<style lang="less" scoped>
.list-wrap {
  margin-top: 200px;
  padding: 24px 36px;
  min-height: 99vh;
  background: #f9f9f9;
  box-sizing: border-box;
  &-card {
    position: relative;
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 16px;
    margin-bottom: 24px;
    overflow: hidden;
    &_tag {
      position: absolute;
      top: -12px;
      left: -38px;
      padding: 0 36px;
      padding-top: 24px;
      font-size: 24px;
      color: #fff;
      background: green;
      transform: rotateZ(-45deg);
    }
    &-header {
      position: relative;
      font-size: 28px;
      font-weight: 700;
      padding-bottom: 16px;
      padding-left: 36px;
      border-bottom: 1px solid #f1f1f1;
      overflow: hidden;
    }
    &-content {
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-left: 96px;
      min-height: 100px;
      overflow: hidden;
      &_label {
        position: absolute;
        top: 50%;
        left: 12px;
        margin-top: -18px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        font-size: 24px;
        color: #fff;
        border-radius: 64px;
      }
      &_info {
        margin-top: 24px;
      }
      &_remark {
        width: 100%;
        flex-shrink: 0;
        margin-top: 10px;
        padding: 12px 24px;
        background: #f3f3f3;
        color: #999;
        font-size: 24px;
        border-radius: 8px
      }
    }
  }
  &-no-data {
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #666;
  }
}
</style>
