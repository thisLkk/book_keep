import { createRouter, createWebHashHistory } from 'vue-router';  
import BillDetails from '@/views/bill-details/index.vue' 
const routes = [  
  {  
    path: '/',  
    redirect: 'bill-details',
  },  
  {  
    path: '/bill-details',  
    name: '账单明细',  
    component: BillDetails  
  },   
];  
 
const router = createRouter({  
  history: createWebHashHistory(),  
  routes  
});  
 
export default router;