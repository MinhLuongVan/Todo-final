<template>
  <div>
    <div class="flex border-2 w-full justify-between h-20 bg-sky-300">
      <div>
        <h2 class="text-3xl text-center text-purple-700 font-serif mt-5 ml-8">
          List Todos
        </h2>
      </div>

      <div>
        <Dropdown>
          <DropdownToggle>
            <UsersIcon class="w-6 h-6 mt-7 mr-12 mb-1 text-purple-700" />
          </DropdownToggle>
          <DropdownMenu class="w-28 mb-5">
            <DropdownContent class="text-base text-purple-700">
              <DropdownItem @click="handlUser, router.push('/user')">
                <UsersIcon class="w-4 h-4 mr-2" /> User
              </DropdownItem>
              <DropdownItem @click="handlLogout">
                <ChevronsLeftIcon class="w-4 h-4 mr-2" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center justify-center mt-2"
      >
        <button
          v-if="!isUpdate"
          class="w-24 h-8 bg-purple-500 hover:bg-purple-700 text-white font-serif text-base shadow-md mr-2 rounded-xl"
          @click="handlAddToDo"
        >
          Add Todo
        </button>
        
        <button
          v-else
          class="w-24 h-8 text-white text-base font-serif mt-4 rounded-xl bg-purple-400 hover:bg-purple-500"
          @click="actionUpdateTodo"
        >
          Update
        </button>

        <button
          class="w-24 h-8 rounded-xl bg-purple-500 hover:bg-purple-700 text-base text-white font-serif"
          @click="handlDeleteAll"
        >
          Clear all
        </button>
      </div>
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center justify-center"
      >
        <div class="justify-center">
          <input
            class="text-purple-500 w-80 h-8 rounded-xl font-serif border-purple-700"
            type="text"
            v-model="title"
            required
            placeholder="Add todo"
          />
        </div>
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
              TITLE
            </th>
            <th
              class="text-center text-base font-serif text-purple-700 whitespace-nowrap"
            >
              STATUS
            </th>
            <th
              class="text-center text-base font-serif text-purple-700 whitespace-nowrap"
            >
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todos" :key="item._id" class="intro-x">
            <td class="text-lg text-center w-96">
              <p class="font-serif w-full text-purple-500">
                {{ item.title }}
              </p>
            </td>

            <td class="text-center border-none w-96">
              <input
                :id="'checkbox-' + item._id"
                :checked="item.status"
                type="checkbox"
                true-value="true"
                false-value="false"
                @change="clickBox(item)"
              />
            </td>

            <td class="w-96">
              <div class="flex justify-center items-center">
                <a
                  class="flex items-center text-green-500"
                  @click="handlUpdate(item)"
                >
                  <CheckSquareIcon class="w-5 h-5 mr-5" />
                </a>
                <a
                  class="flex items-center text-danger"
                  @click="handlDelete(item._id)"
                >
                  <Trash2Icon class="w-5 h-5 mr-2" />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="justify-center flex items-center float-right mt-2">
        <button
          class="w-24 h-8 rounded-xl bg-purple-500 hover:bg-purple-700 text-base text-white font-serif"
          @click="handlDeleteAll"
        >
          Clear all
        </button>
      </div> -->
      <div class="mt-10">
        <paginate
          class="flex justify-center items-center"
          :page-count="totalPages"
          :click-handler="getToDoPage"
          :prev-text="'<<'"
          :next-text="'>>'"
          :container-class="'pagination'"
        >
        </paginate>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '../../stores/todo';
import Cookies from 'js-cookie';
import Paginate from 'vuejs-paginate-next';
import {
  requestDeleteToDo,
  requestAddToDo,
  requestUpdateToDo,
  requestDeleteAllToDo,
  requestGetToDoByPage
} from '../../services/todoService';


export default {
  name: 'Todolist',
  components: {
    Paginate
  },
  setup() {
    const router = useRouter();
    const title = ref('');
    const isUpdate = ref(false);
    const todoUpdate = ref('');
    const item = ref('');
    const todoIdTpUpdate = ref('');
    const truevalue = ref(true);
    const falsevalue = ref(false);
    const { todos } = storeToRefs(useTodosStore());
    const { getAllByPage, findTodoPage, deleteTodo, addTodo } = useTodosStore();
    const currentPage = ref(1);
    const startPage = ref(1);
    const endPage = ref(1);
    const lastPage = ref(1);
    const totalPages = ref(1);

    async function getToDoPage(page) {
      currentPage.value = page;
      const res = await requestGetToDoByPage(currentPage.value);
      findTodoPage(res.data.todo);
      totalPages.value = res.data.totalPages;
    }
    onMounted(() => {
      if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
      } else {
        localStorage.setItem('reloaded', '1');
        location.reload();
      }
      getToDoPage();
    });

    const handlAddToDo = async () => {
      try {
        const addToDo = {
          title: title.value
        };
        if (title.value == '') {
          alert('Vui lòng nhập todo!');
        } else {
          const res = await requestAddToDo(addToDo);
          console.log('res', res.data);
          addTodo(res.data);
          getToDoPage();
          title.value = '';
        }
      } catch (err) {
        console.log(err);
      }
    };
    const handlUpdate = async (data) => {
      if (data) {
        todoUpdate.value = data;
        item.value = data;
        todoIdTpUpdate.value = data._id;
        title.value = data.title;
        isUpdate.value = true;
      }
    };

    const actionUpdateTodo = async () => {
      try {
        const todoUpdate = {
          _id: todoIdTpUpdate.value,
          title: title.value
        };
        const res = await requestUpdateToDo(todoUpdate);
        console.log('res', res.data);
        getAllByPage();
        getToDoPage();
        isUpdate.value = false;
      } catch (error) {
        console.log(error);
      }
      title.value = '';
    };
    const handlDelete = async (id) => {
      try {
        const todo = await requestDeleteToDo(id);
        console.log('todo1', todo);
        deleteTodo(id);
        getToDoPage();
      } catch (error) {
        console.log(error);
      }
    };
    const handlDeleteAll = async () => {
      try {
        const todo = await requestDeleteAllToDo();
        console.log('delete', todo);
        getAllByPage();
        getToDoPage();
      } catch (error) {
        console.log(error);
      }
    };

    async function clickBox(data) {
      if (data) {
        const checkboxItem = document.getElementById('checkbox-' + data._id);
        if (checkboxItem.checked) {
          const item = {
            _id: data._id,
            title: data.title,
            status: truevalue.value
          };
          const res = await requestUpdateToDo(item);
          if (res) {
            getToDoPage();
          }
        } else {
          const item = {
            _id: data._id,
            title: data.title,
            status: falsevalue.value
          };
           const res = await requestUpdateToDo(item);
          if (res) {
            getToDoPage();
          }
        }
      }
    }
    const handlLogout = async () => {
      try {
        await Cookies.remove('cookieRefesh');
        Cookies.remove('token');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    };
    return {
      router,
      todos,
      title,
      item,
      isUpdate,
      todoUpdate,
      handlDelete,
      handlDeleteAll,
      handlAddToDo,
      handlUpdate,
      actionUpdateTodo,
      handlLogout,
      getToDoPage,
      getAllByPage,
      currentPage,
      lastPage,
      startPage,
      endPage,
      totalPages,
      clickBox
    };
  }
};
</script>
<style>
.page-item {
  font-size: 14px;
  cursor: pointer;
}
</style>
