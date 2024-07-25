<template>
    <v-sheet class="pa-10" color="transparent">
        <v-data-table :headers="headers" :items="users">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ `${model}s` }}</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" dark v-bind="props" @click="editedIndex = 0">
                                {{ `New ${model}` }}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field variant="outlined" v-model="defaultItem.first_name"
                                                label="First Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field variant="outlined" v-model="defaultItem.last_name"
                                                label="Last Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field variant="outlined" v-model="defaultItem.email"
                                                label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select :items="statuses" v-model="defaultItem.status" variant="outlined"
                                                label="Status"></v-select>
                                        </v-col>
                                        <v-col v-if="integrations.length > 1" cols="12">
                                            <v-select :items="integrations" v-model="defaultItem.integrations" variant="outlined"
                                                label="Integrations"></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">{{`Are you sure you want to delete this
                                ${model}?`}}</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item.user_id)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-sheet>
</template>

<script lang="ts" setup>
import axios from 'axios';

const props = defineProps({
    model: String,
})

const users = ref([])

const getUsers = () => axios.get('http://localhost:8000/users').then((response) => {
    console.log(response.data);
    users.value = response.data
})

getUsers();

const integrations = ref([])
const getIntegrations = () => axios.get('http://localhost:8000/integrations').then((response) => {
    console.log(response.data);
    integrations.value = response.data
})

const headers = [
    {
        title: 'User ID',
        sortable: false,
        key: 'user_id',
    },
    { title: 'First Name', key: 'first_name' },
    { title: 'Last Name', key: 'last_name' },
    { title: 'Email', key: 'email' },
    { title: 'Status', key: 'status' },
    { title: 'Integrations', key: 'integrations' },
    { title: 'Actions', key: 'actions', sortable: false },
]

const statuses = ['active', 'inactive']

let defaultItem = reactive({
    first_name: '',
    last_name: '',
    email: '',
    status: '',
    integrations: [],
})

const dialog = ref(false)
const dialogDelete = ref(false)
const editedIndex = ref(-1)
const formTitle = computed(() => editedIndex.value === -1 ? `New ${props.model}` : `Edit ${props.model}`)

const close = () => {
    dialog.value = false
}

const save = () => {
    if (editedIndex.value < 0) {
        axios.post('http://localhost:8000/users', defaultItem).then((response) => {
            getUsers()
        })
    } else {
        axios.put(`http://localhost:8000/users/${editedIndex.value}`, defaultItem)
        getUsers()
    }
    close()
}

const closeDelete = () => {
    dialogDelete.value = false
}

const editItem = (item) => {
    console.log(item)
    editedIndex.value = item.user_id
    defaultItem = Object.assign({}, item)
    dialog.value = true
}

const toDeleteId = ref(0)

const deleteItem = (id) => {
    toDeleteId.value = id
    dialogDelete.value = true
}

const deleteItemConfirm = () => {
    axios.delete(`http://localhost:8000/users/${toDeleteId.value}`)
    getUsers()
    closeDelete()
}
</script>