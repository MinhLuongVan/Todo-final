<template>
  <div>
    <div class="flex border-2 w-full justify-between h-20 bg-sky-300">
      <h2 class="text-3xl text-center text-purple-700 font-serif mt-5 ml-8">
        List Users
      </h2>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center justify-center mt-2"
      >
       <button
          class="w-24 h-8 bg-purple-500 hover:bg-purple-700 text-white font-serif text-base shadow-md mr-2 rounded-xl"
          @click="router.push('/todolist')"
        >
          Todo
        </button>
       
        <button
          class="w-24 h-8 bg-purple-500 hover:bg-purple-700 text-white font-serif text-base shadow-md mr-2 rounded-xl"
          @click="router.push('/adduser')"
        >
          Add User
        </button>
      </div>
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center justify-center"
      >
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 lg:overflow-visible">
      <table class="table table-report -mt-2 mr-3">
        <thead>
          <tr>
            <th
              class="text-center text-base font-serif text-purple-700 whitespace-nowrap"
            >
              USERNAME
            </th>
            <th
              class="text-center text-base font-serif text-purple-700 whitespace-nowrap"
            >
              ADMIN
            </th>
            <th
              class="text-center text-base font-serif text-purple-700 whitespace-nowrap"
            >
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" class="intro-x">
            <td class="text-lg text-center w-96">
              <p class="font-medium w-full text-purple-500">
                {{ user.username }}
              </p>
            </td>

            <td class="text-lg text-center w-96">
              <p class="font-medium w-full text-purple-500">
                {{ user.isAdmin }}
              </p>
            </td>

            <td class="text-lg w-96">
              <div class="flex justify-center items-center">
                <a
                  class="flex items-center text-green-500"
                  @click="handlUpdate(user)"
                >
                  <CheckSquareIcon class="w-5 h-5 mr-5" />
                </a>
                <a
                  class="flex items-center text-danger"
                  @click="handlDelete(user._id)"
                >
                  <Trash2Icon class="w-5 h-5 mr-2" />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="mt-8">
        <paginate
          class="flex justify-center items-center"
          :page-count="totalPages"
          :click-handler="getToDoPage"
          :prev-text="'<<'"
          :next-text="'>>'"
          :container-class="'pagination'"
        >
        </paginate>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthorStore } from '../../stores/user';
import { useRouter } from 'vue-router';
import {
  requestDeleteUser
} from '../../services/userServices';
export default {
  name: 'Listuser',
  setup() {
    const username = ref('');
    const password = ref('');
    const userUpdate = ref();
    const router = useRouter();
    const {users} = storeToRefs(useAuthorStore());
    const {getAllUsers} = useAuthorStore();
    //get tất cả user
    onMounted(() => {
      getAllUsers();
    });
    // lấy id của item muốn update
    const handlUpdate = async (data) => {
      if (data) {
        userUpdate.value = data;
        console.log('data', data);
        username.value = data.value;
        password.value = data.value;
      }
      router.push(`/edituser/${data._id}`);
    };
    // delete user
    const handlDelete = async (id) => {
      try {
        const user = await requestDeleteUser(id);
        console.log('user', user);
        getAllUsers();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      users,
      username,
      password,
      router,
      getAllUsers,
      handlUpdate,
      handlDelete,
 
    };
  }
};
</script>
