//define routes for home , study grp , resources , forum , skill trade 

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import StudyGroups from '../pages/StudyGroups.vue';
import Resources from '../pages/Resources.vue';
import Forum from '../pages/Forum.vue';
import SkillTrade from '../pages/SkillTrade.vue';


const routes=[
    {path:'/', name:'Home', component:Home},
    {path:'/studygroups', name:'StudyGroups', component:StudyGroups},
    {path:'/resources', name:'Resources', component:Resources},
    {path:'/forum', name:'Forum', component:Forum},
    {path:'/skilltrade', name:'SkillTrade', component:SkillTrade},

    {
        path:'/:pathMatch(.*)*',
        name:'NotFound',
        component:{
            template:'<h2>404 Not Found</h2>'
        }
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior(){
        return {top:0};
    }
});
export default router;
