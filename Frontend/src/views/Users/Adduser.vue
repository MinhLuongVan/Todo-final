<template>
  <div>
    <div class="flex border-2 w-full justify-between h-20 bg-sky-300">
      <h2 class="text-3xl text-center text-purple-700 font-serif mt-5 ml-8">
        Add User
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
              v-model="firstname"
              class="form-control w-full border-1 border-neutral-200 rounded-md"
              placeholder="firstname"
            />

            <input
              id="crud-form-1"
              type="text"
              v-model="lastname"
              class="form-control w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="lastname"
            />

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
              @click="handlAddUser"
            >
              Add
            </button>
          </div>
        </div>
        <!-- END: Form Layout -->
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { requestAddUser } from '../../services/userServices';
export default {
  name: 'Adduser',
  setup() {
    const router = useRouter();
    const firstname = ref('');
    const lastname = ref('');
    const username = ref('');
    const password = ref('');
    const users = ref([]);
    //create
    const handlAddUser = async () => {
      try {
        const addUser = {
          firstname: firstname.value,
          lastname: lastname.value,
          username: username.value,
          password: password.value
        };
        if (
          firstname.value == '' ||
          lastname.value == '' ||
          username.value == '' ||
          password.value == ''
        ) {
          alert('Vui lòng nhập đủ thông tin');
        } else {
          const res = await requestAddUser(addUser);
          console.log('res', res.data);
          getAllUsers();
          firstname.value = '';
          lastname.value = '';
          username.value = '';
          password.value = '';
        }
      } catch (err) {
        console.log(err);
      }
      router.push('/user');
    };
    return {
      router,
      username,
      firstname,
      lastname,
      password,
      users,
      handlAddUser
    };
  }
};
</script>
