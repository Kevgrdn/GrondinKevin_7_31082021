<template>
    <div class="row">
        <div class="row justify-content-around">
            <h1 class=" my-3">Collègues</h1>
            <div v-for="user in users" v-bind:key="user.id" class=" bg-perso rounded-perso col-3 py-1 m-1">
                <img v-if="user.imageUrl !==  '' || null"  :src=user.imageUrl class="pdp my-auto">
                <img v-if="user.imageUrl ==  '' || null"  src="https://st3.depositphotos.com/19428878/36416/v/450/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg" class="pdp my-auto">
                <div class="fw-bold "> {{user.firstname}} {{user.name}}
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'users',
    data(){
        return{
            users:[]
        }
    },  
    methods:{

        //GET ALL USERS / AFFICHE TOUS LES UTILISATEURS
        showUsers(){
            axios.get('auth/users', {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
            .then((res) => {
                console.log(res)
                this.users = res.data
                })
            .catch(() => {
                console.log()
            })
        }
        
    },
    beforeMount(){
        this.showUsers()
    }


}
</script>

<style lang="scss">

.userProfile
{
    transition: 0.7s ease-in-out;

    &:hover
    {
        background-color: white;
        color: #1c87c9;
        width: 21rem;
        


    }
}


</style>