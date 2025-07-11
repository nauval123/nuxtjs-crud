<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="books.length < 11"
      :items="books"
      item-value="title"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-book-multiple"
              size="x-small"
              start
            ></v-icon>

            Popular books
          </v-toolbar-title>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add a Book"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.title="{ value }">
        <v-chip
          :text="value"
          border="thin opacity-25"
          prepend-icon="mdi-book"
          label
        >
          <template v-slot:prepend>
            <v-icon color="medium-emphasis"></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.id)"
          ></v-icon>

          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="remove(item.id)"
          ></v-icon>
        </div>
      </template>

      <template
        v-slot:item.data-table-expand="{
          internalItem,
          isExpanded,
          toggleExpand,
        }"
      >
        <v-btn
          :append-icon="
            isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'
          "
          :text="isExpanded(internalItem) ? 'Collapse' : 'More info'"
          class="text-none"
          color="medium-emphasis"
          size="small"
          variant="text"
          border
          slim
          @click="toggleExpand(internalItem)"
        ></v-btn>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length" class="py-2">
            <v-sheet rounded="lg" border>
              <v-table density="compact">
                <tbody class="bg-surface-light">
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td>{{ item.title }}</td>
                    <td>{{ item.author }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
      :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="record.title" label="Title"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="record.author" label="Author"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input
              v-model="record.year"
              :max="adapter.getYear(adapter.date())"
              :min="1"
              label="Year"
            ></v-number-input>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input
              v-model="record.pages"
              :min="1"
              label="Pages"
            ></v-number-input>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onMounted, ref, shallowRef } from "vue";
import { useDate } from "vuetify";

const adapter = useDate();

const DEFAULT_RECORD = {
  title: "",
  author: "",
  genre: "",
  year: adapter.getYear(adapter.date()),
  pages: 1,
};

const books = ref([]);
const record = ref(DEFAULT_RECORD);
const dialog = shallowRef(false);
const isEditing = shallowRef(false);

const headers = [
  { title: "Title", key: "title", align: "start" },
  { title: "Author", key: "author" },
  { title: "Genre", key: "genre" },
  { title: "Year", key: "year", align: "end" },
  { title: "Pages", key: "pages", align: "end" },
  { title: "Actions", key: "actions", align: "end", sortable: false },
];

onMounted(() => {
  reset();
});

function add() {
  isEditing.value = false;
  record.value = DEFAULT_RECORD;
  dialog.value = true;
}

function edit(id) {
  isEditing.value = true;

  const found = books.value.find((book) => book.id === id);

  record.value = {
    id: found.id,
    title: found.title,
    author: found.author,
    genre: found.genre,
    year: found.year,
    pages: found.pages,
  };

  dialog.value = true;
}

function remove(id) {
  const index = books.value.findIndex((book) => book.id === id);
  books.value.splice(index, 1);
}

function save() {
  if (isEditing.value) {
    const index = books.value.findIndex((book) => book.id === record.value.id);
    books.value[index] = record.value;
  } else {
    record.value.id = books.value.length + 1;
    books.value.push(record.value);
  }

  dialog.value = false;
}

function reset() {
  dialog.value = false;
  record.value = DEFAULT_RECORD;
  books.value = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      year: 1960,
      pages: 281,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      year: 1949,
      pages: 328,
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      year: 1925,
      pages: 180,
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "Non-Fiction",
      year: 2011,
      pages: 443,
    },
    {
      id: 5,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Sci-Fi",
      year: 1965,
      pages: 412,
    },
  ];
}
</script>
