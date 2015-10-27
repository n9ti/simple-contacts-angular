var app = angular.module('app', ['angular-loading-bar'])

app.controller('AppController', function (Contacts) {
  var vm = this
  vm.mode = 'view'
  vm.contacts = []
  vm.contact = null

  vm.openContact = function (contact) {
    vm.contact = Object.create(contact)
    vm.mode = 'view'
  }

  vm.getContacts = function () {
    Contacts.query(function (err, response) {
      vm.contacts = response.data.results
    })
  }

  vm.getContact = function (id) {
    Contacts.get(id, function (err, response) {
      vm.contact = response.data
    })
  }

  vm.addContact = function (contact) {
    Contacts.save(contact, function (err, response) {
      vm.mode = 'view'
      vm.contact.objectId = response.data.objectId
      vm.getContacts()
    })
  }

  vm.deleteContact = function (id) {
    Contacts.delete(id, function (err, response) {
      vm.contact = null
      vm.getContacts()
    })
  }

  vm.editContact = function (contact) {
    Contacts.update(contact.objectId, contact, function (err, response) {
      vm.getContacts()
      vm.mode = 'view'
    })
  }

  vm.submit = function (contact) {
    if (contact.objectId) {
      vm.editContact(contact)
    } else {
      vm.addContact(contact)
    }
  }

  vm.print = function () {
    window.print()
  }

  vm.getContacts()
})

app.factory('Contacts', function ($http) {
  var endpoint = 'https://api.parse.com/1/classes/Contacts'
  var headers = {
    'X-Parse-Application-Id': 'sUcPCYAUl3M0JZTQrIMKVfGEdBAgeICkgz11uOCq',
    'X-Parse-REST-API-Key': 'Omrf9kE7dV17olksTP5VBvxxyZlVk5TNLWmYwLja'
  }
  return {
    get: function (id, callback) {
      $http({
        method: 'GET',
        url: endpoint + '/' + id,
        headers: headers
      }).then(function successCallback (response) {
        callback(null, response)
      }, function errorCallback (response) {
        callback(response, null)
      })
    },
    query: function (callback) {
      $http({
        method: 'GET',
        url: endpoint,
        headers: headers
      }).then(function successCallback (response) {
        callback(null, response)
      }, function errorCallback (response) {
        callback(response, null)
      })
    },
    save: function (contact, callback) {
      $http({
        method: 'POST',
        url: endpoint,
        headers: headers,
        data: contact
      }).then(function successCallback (response) {
        callback(null, response)
      }, function errorCallback (response) {
        callback(response, null)
      })
    },
    update: function (id, data, callback) {
      $http({
        method: 'PUT',
        url: endpoint + '/' + id,
        headers: headers,
        data: data
      }).then(function successCallback (response) {
        callback(null, response)
      }, function errorCallback (response) {
        callback(response, null)
      })
    },
    delete: function (id, callback) {
      $http({
        method: 'DELETE',
        url: endpoint + '/' + id,
        headers: headers
      }).then(function successCallback (response) {
        callback(null, response)
      }, function errorCallback (response) {
        callback(response, null)
      })
    }
  }
})
