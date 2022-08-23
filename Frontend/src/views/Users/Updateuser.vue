<template>
  <div>
    <div class="flex border-2 w-full justify-between h-20 bg-sky-300">
      <h2 class="text-3xl text-center text-purple-700 font-serif mt-5 ml-8">
        Update User
      </h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Layout -->
        <div class="intro-y box p-5">
          <div>
            <input
              id="crud-form-1"
              type="text"
              v-model="username"
              class="form-control w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="username"
            />
            <input
              id="crud-form-1"
              type="password"
              v-model="password"
              class="form-control w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="password"
            />
          </div>

          <div class="text-right mt-5">
            <button
              type="button"
              class="border-2 w-24 h-8 rounded-lg font-serif mr-1"
              @click="router.push('/user')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-24 h-8 text-white font-serif bg-purple-500 hover:bg-purple-700 rounded-lg"
              @click="actionUpdateUser()"
            >
              Update
            </button>
          </div>
        </div>
        <!-- END: Form Layout -->
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import {
  requestFindUserUpdate,
  requestUpdateUser
} from '../../services/userServices';

export default {
  name: 'Updateuser',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const route = useRoute();
    const updateUserId = ref('');
    const actionUpdateUser = async () => {
      try {
        const updateUser = {
          _id: updateUserId.value,
         username: username.value,
         password: password.value,
        };
        const res = await requestUpdateUser(updateUser);
        router.push('/user');
      } catch (error) {
        console.log(error);
      }
      username.value = '';
      password.value = '';
    };

    // tìm title tương ứng theo id
    const findUserUpdate = async () => {
      try {
        const res = await requestFindUserUpdate(route.params.id);
        console.log('user', res.data);
        username.value = res.data.user.username;
        password.value = res.data.user.password;
        updateUserId.value = res.data.user._id;
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      findUserUpdate();
    });
    return {
      router,
      username,
      password,
      actionUpdateUser
    };
  }
};
</script>


