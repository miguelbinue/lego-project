import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },

    async addTask() {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          // title: title,
          is_complete: false,
          // description: description,
        },
      ]);
      // console.log(data);
      return data[0];
    },

    async editTask(title, description, id) {
      console.log(useUserStore().user.id);
      const { data: tasks } = await supabase
        .from("tasks")
        .update([
          {
            title: title,
            description: description,
          },
        ])
        .match({
          id: id,
        });
    },

    async taskDone(is_complete, id) {
      console.log(useUserStore().user.id);
      const { data: tasks } = await supabase
        .from("tasks")
        .update([
          {
            is_complete: !is_complete,
          },
        ])
        .match({
          id: id,
        });
    },

    async deleteTask(id) {
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },
  },
});
