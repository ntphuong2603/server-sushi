const AccessControl = require('access-control')

const grandObject = {
    category:{
        'create:any':['*'],
        'read:any':['*'],
        'update:any':['*'],
        'delete:any':['*'],
    },
    menu:{
        'create:any':['*'],
        'read:any':['*'],
        'update:any':['*'],
        'delete:any':['*'],
    },
    menuImage:{
        'create:any':['*'],
        'read:any':['*'],
        'update:any':['*'],
        'delete:any':['*'],
    }
}