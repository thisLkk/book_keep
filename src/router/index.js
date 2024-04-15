import { createRouter, createWebHistory } from 'vue-router';  
import BillDetails from '../views/bill-details/index.vue' 
const routes = [  
  {  
    path: '/',  
    redirect: 'bill_details',
  },  
  {  
    path: '/bill_details',  
    name: '账单明细',  
    component: BillDetails  
  },  
];  
 
const router = createRouter({  
  history: createWebHistory(),  
  routes  
});  
 
export default router;