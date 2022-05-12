<template>
    <span>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!userHasAuth">
            <li class="nav-item">
                <router-link to="/login"  class="nav-link fs-5"
                    >Login</router-link
                >
            </li>
            <li class="nav-item">
                <router-link to="/register" class="nav-link fs-5"
                    >Register</router-link
                >
            </li>
        </ul>
        
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
            <li class="nav-item">
                <router-link to="/cart" class="nav-link nav-icon position-relative fs-5">
                    <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                    <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                        {{getAllCarts.length}}
                    </span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/favorite" class="nav-link nav-icon position-relative fs-5">
                    <i class="fa-solid fa-heart text-dark mr-1"></i>
                    <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                        {{getAllFavorites.length}}
                    </span>
                </router-link>
            </li>
             <li class="nav-item">
                <router-link to="/profile" class="dropdown-item fs-5"> <i class="fa-solid fa-user"></i> </router-link>
            </li>
            <li class="nav-item">
                <button @click="logout" class="dropdown-item fs-5"><i class="fa-solid fa-right-from-bracket"></i> </button>
            </li>
        </ul>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters(['getAllCarts','getAllFavorites','userHasAuth','userIsAdmin'])
    },
    methods:{
        logout:async function(){
              await Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't logout",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: 'rgb(227 119 87)',
                    cancelButtonColor: 'rgb(29 173 86)  ',
                    confirmButtonText: 'Logout'
                    }).then((result) => {
                if (result.isConfirmed) {
                        this.$store.dispatch('logoutUser')
                        .then(re =>  this.$router.push('/login'))
                        .catch(err =>{
                            this.$helpers.showErrors(err)
                        } )
                    }
                })
        }
    }
};
</script>

<style></style>
