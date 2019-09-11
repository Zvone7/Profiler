﻿import { getUserCookieOrLogout, deleteCookie } from '../utils/utils-cookie';
import { JSONtryParse } from '../utils/utils-general'
import { userCookieName } from '../utils/constants';

export var displayUserData = Vue.component('display-user-data',
    {
        data: function () {
            return {
                Name: '',
                LastName: ''
                //isLogoutDisabled: true
            }
        },
        computed: {
            isLogoutDisabled() {
                let isDisabled = true;
                var userCookie = getUserCookieOrLogout(userCookieName);
                var userData = JSONtryParse(userCookie);
                this.$data.Name = userData.name;
                this.$data.LastName = userData.lastName;
                if (
                    this.$data.Name &&
                    this.$data.LastName !== ''
                ) {
                    isDisabled = false;
                }

                return isDisabled;
            }
        },
        methods: {
            Logout() {
                deleteCookie(userCookieName);
                this.$parent.Name = '';
                this.$parent.LastName = '';
                window.location.href = '/';

                axios({
                    method: 'get',
                    url: '/User/LogOut'
                }).then(data => {
                    console.log("__Logged out: ", data.data);
                    //this.$refs.LoginButton.setAttribute("disabled", "disabled");
                    // create cookie
                    //if (data.data.email != undefined && data.data.password != "") {
                    //    var userData = data.data;
                    //    createCookie(userCookieName, JSON.stringify(userData), new Date(new Date().getTime() + 10 * 60 * 1000), "/", null);
                    //    //todo cookies not expiring/being deleted when expired..handle it.

                    //    window.location.href = '/';
                    //}
                }).catch(err => {
                    alert(`There was an error logging out. See details: ${err}`);
                });

            }
        },
        template: `<div>

                    <label>{{Name}}</label>

                    <br/>

                    <label>{{LastName}}</label>

                    <button 
                        type="button" 
                        ref="LogoutButton" 
                        v-bind:disabled="isLogoutDisabled" 
                        v-on:click="Logout">Logout
                    </button>

                    </div>`
    }
)